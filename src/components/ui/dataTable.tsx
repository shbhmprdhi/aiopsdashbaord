// "use client"

// import React, { useState, ChangeEvent } from 'react';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Input } from '@/components/ui/input';

// interface Step {
//   name: string;
//   result: {
//     status: string;
//     duration: number;
//   };
// }

// interface Scenario {
//   id: string;
//   name: string;
//   steps: Step[];
// }

// interface Feature {
//   id: string;
//   name: string;
//   elements: Scenario[];
// }

// const JsonFileTable = () => {
//   const [tableData, setTableData] = useState<Feature[]>([]);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: ProgressEvent<FileReader>) => {
//         try {
//           const json = JSON.parse(e.target?.result as string);
//           setTableData(json);
//         } catch (error) {
//           alert('Error parsing JSON file. Please make sure it\'s a valid JSON.');
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

//   const renderTable = (data: Feature[]) => {
//     if (!data || data.length === 0) return null;

//     const headers = ['Feature', 'Scenario', 'Step', 'Status', 'Duration'];

//     return (
//       <Table className="mt-4">
//         <TableHeader>
//           <TableRow>
//             {headers.map((header) => (
//               <TableHead key={header}>{header}</TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.flatMap((feature) =>
//             feature.elements.flatMap((scenario) =>
//               scenario.steps.map((step, stepIndex) => (
//                 <TableRow key={`${feature.id}-${scenario.id}-${stepIndex}`}>
//                   <TableCell>{stepIndex === 0 ? feature.name : ''}</TableCell>
//                   <TableCell>{stepIndex === 0 ? scenario.name : ''}</TableCell>
//                   <TableCell>{step.name}</TableCell>
//                   <TableCell>{step.result.status}</TableCell>
//                   <TableCell>{(step.result.duration / 1000000).toFixed(2)}ms</TableCell>
//                 </TableRow>
//               ))
//             )
//           )}
//         </TableBody>
//       </Table>
//     );
//   };

//   return (
//     <div className="p-4">
//       <Input type="file" accept=".json" onChange={handleFileChange} className="mb-4 cursor-pointer" />
//       {renderTable(tableData)}
//     </div>
//   );
// };

// export default JsonFileTable;

/////////////////////////////////////////////////

// "use client"

// import React, { useState, ChangeEvent, useMemo } from 'react';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// interface Step {
//   name: string;
//   result: {
//     status: string;
//     duration: number;
//   };
// }

// interface Scenario {
//   id: string;
//   name: string;
//   steps: Step[];
// }

// interface Feature {
//   id: string;
//   name: string;
//   elements: Scenario[];
// }

// interface ChartData {
//   name: string;
//   value: number;
// }

// interface DonutChartProps {
//   data: ChartData[];
//   title: string;
// }

// const COLORS = ['#4CAF50', '#F44336'];

// const DonutChart: React.FC<DonutChartProps> = ({ data, title }) => (
//   <Card className="w-[300px]">
//     <CardHeader>
//       <CardTitle>{title}</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <ResponsiveContainer width="100%" height={200}>
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             innerRadius={60}
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="value"
//             label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//         </PieChart>
//       </ResponsiveContainer>
//     </CardContent>
//   </Card>
// );

// const JsonFileTable: React.FC = () => {
//   const [tableData, setTableData] = useState<Feature[]>([]);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: ProgressEvent<FileReader>) => {
//         try {
//           const json = JSON.parse(e.target?.result as string);
//           setTableData(json);
//         } catch (error) {
//           alert('Error parsing JSON file. Please make sure it\'s a valid JSON.');
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

//   const { featureData, scenarioData, stepData } = useMemo(() => {
//     let passedFeatures = 0, totalFeatures = 0;
//     let passedScenarios = 0, totalScenarios = 0;
//     let passedSteps = 0, totalSteps = 0;

//     tableData.forEach(feature => {
//       totalFeatures++;
//       let featurePassed = true;

//       feature.elements.forEach(scenario => {
//         totalScenarios++;
//         let scenarioPassed = true;

//         scenario.steps.forEach(step => {
//           totalSteps++;
//           if (step.result.status === 'passed') {
//             passedSteps++;
//           } else {
//             scenarioPassed = false;
//             featurePassed = false;
//           }
//         });

//         if (scenarioPassed) passedScenarios++;
//       });

//       if (featurePassed) passedFeatures++;
//     });

//     return {
//       featureData: [
//         { name: 'Passed', value: passedFeatures },
//         { name: 'Failed', value: totalFeatures - passedFeatures }
//       ],
//       scenarioData: [
//         { name: 'Passed', value: passedScenarios },
//         { name: 'Failed', value: totalScenarios - passedScenarios }
//       ],
//       stepData: [
//         { name: 'Passed', value: passedSteps },
//         { name: 'Failed', value: totalSteps - passedSteps }
//       ]
//     };
//   }, [tableData]);

//   const renderTable = (data: Feature[]) => {
//     if (!data || data.length === 0) return null;

//     const headers = ['Feature', 'Scenario', 'Step', 'Status', 'Duration'];

//     return (
//       <Table className="mt-4">
//         <TableHeader>
//           <TableRow>
//             {headers.map((header) => (
//               <TableHead key={header}>{header}</TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.flatMap((feature) =>
//             feature.elements.flatMap((scenario) =>
//               scenario.steps.map((step, stepIndex) => (
//                 <TableRow key={`${feature.id}-${scenario.id}-${stepIndex}`}>
//                   <TableCell>{stepIndex === 0 ? feature.name : ''}</TableCell>
//                   <TableCell>{stepIndex === 0 ? scenario.name : ''}</TableCell>
//                   <TableCell>{step.name}</TableCell>
//                   <TableCell>{step.result.status}</TableCell>
//                   <TableCell>{(step.result.duration / 1000000).toFixed(2)}ms</TableCell>
//                 </TableRow>
//               ))
//             )
//           )}
//         </TableBody>
//       </Table>
//     );
//   };

//   return (
//     <div className="p-4">
//       <Input type="file" accept=".json" onChange={handleFileChange} className="mb-4 cursor-pointer" />
//       <div className="flex justify-around mb-4">
//         <DonutChart data={featureData} title="Features" />
//         <DonutChart data={scenarioData} title="Scenarios" />
//         <DonutChart data={stepData} title="Steps" />
//       </div>
//       {renderTable(tableData)}
//     </div>
//   );
// };

// export default JsonFileTable;


"use client"

import React, { useState, ChangeEvent, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Label, Cell } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface Step {
  name: string;
  result: {
    status: string;
    duration: number;
  };
}

interface Scenario {
  id: string;
  name: string;
  steps: Step[];
}

interface Feature {
  id: string;
  name: string;
  elements: Scenario[];
}

interface ChartData {
  name: string;
  value: number;
  fill: string;
}

interface DonutChartProps {
  data: ChartData[];
  title: string;
  description: string;
}

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

const DonutChart: React.FC<DonutChartProps> = ({ data, title, description }) => {
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);
  const passRate = useMemo(() => (data[0].value / total) * 100, [data, total]);
  const trend = passRate > 50 ? 'up' : 'down';

  const chartConfig = {
    [data[0].name.toLowerCase()]: {
      label: data[0].name,
      color: COLORS[0],
    },
    [data[1].name.toLowerCase()]: {
      label: data[1].name,
      color: COLORS[1],
    },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data[0].value}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Passed
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending {trend} by {passRate.toFixed(1)}% 
          {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing {title.toLowerCase()} pass rate
        </div>
      </CardFooter>
    </Card>
  );
};

const JsonFileTable: React.FC = () => {
  const [tableData, setTableData] = useState<Feature[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setTableData(json);
        } catch (error) {
          alert('Error parsing JSON file. Please make sure it\'s a valid JSON.');
        }
      };
      reader.readAsText(file);
    }
  };

  const { featureData, scenarioData, stepData } = useMemo(() => {
    let passedFeatures = 0, totalFeatures = 0;
    let passedScenarios = 0, totalScenarios = 0;
    let passedSteps = 0, totalSteps = 0;

    tableData.forEach(feature => {
      totalFeatures++;
      let featurePassed = true;

      feature.elements.forEach(scenario => {
        totalScenarios++;
        let scenarioPassed = true;

        scenario.steps.forEach(step => {
          totalSteps++;
          if (step.result.status === 'passed') {
            passedSteps++;
          } else {
            scenarioPassed = false;
            featurePassed = false;
          }
        });

        if (scenarioPassed) passedScenarios++;
      });

      if (featurePassed) passedFeatures++;
    });

    return {
      featureData: [
        { name: 'Passed', value: passedFeatures, fill: COLORS[0] },
        { name: 'Failed', value: totalFeatures - passedFeatures, fill: COLORS[1] }
      ],
      scenarioData: [
        { name: 'Passed', value: passedScenarios, fill: COLORS[0] },
        { name: 'Failed', value: totalScenarios - passedScenarios, fill: COLORS[1] }
      ],
      stepData: [
        { name: 'Passed', value: passedSteps, fill: COLORS[0] },
        { name: 'Failed', value: totalSteps - passedSteps, fill: COLORS[1] }
      ]
    };
  }, [tableData]);

  const renderTable = (data: Feature[]) => {
    if (!data || data.length === 0) return null;

    const headers = ['Feature', 'Scenario', 'Step', 'Status', 'Duration'];

    return (
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.flatMap((feature) =>
            feature.elements.flatMap((scenario) =>
              scenario.steps.map((step, stepIndex) => (
                <TableRow key={`${feature.id}-${scenario.id}-${stepIndex}`}>
                  <TableCell>{stepIndex === 0 ? feature.name : ''}</TableCell>
                  <TableCell>{stepIndex === 0 ? scenario.name : ''}</TableCell>
                  <TableCell>{step.name}</TableCell>
                  <TableCell>{step.result.status}</TableCell>
                  <TableCell>{(step.result.duration / 1000000).toFixed(2)}ms</TableCell>
                </TableRow>
              ))
            )
          )}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="p-4">
      <Input type="file" accept=".json" onChange={handleFileChange} className="mb-4 cursor-pointer" />
      <div className="flex flex-wrap justify-around gap-4 mb-4">
        <DonutChart data={featureData} title="Features" description="Feature Pass Rate" />
        <DonutChart data={scenarioData} title="Scenarios" description="Scenario Pass Rate" />
        <DonutChart data={stepData} title="Steps" description="Step Pass Rate" />
      </div>
      {renderTable(tableData)}
    </div>
  );
};

export default JsonFileTable;