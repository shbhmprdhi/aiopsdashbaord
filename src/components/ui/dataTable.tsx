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

"use client"

import React, { useState, ChangeEvent, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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

const COLORS = ['#4CAF50', '#F44336'];

const DonutChart = ({ data, title }) => (
  <Card className="w-[300px]">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const JsonFileTable = () => {
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
        { name: 'Passed', value: passedFeatures },
        { name: 'Failed', value: totalFeatures - passedFeatures }
      ],
      scenarioData: [
        { name: 'Passed', value: passedScenarios },
        { name: 'Failed', value: totalScenarios - passedScenarios }
      ],
      stepData: [
        { name: 'Passed', value: passedSteps },
        { name: 'Failed', value: totalSteps - passedSteps }
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
      <div className="flex justify-around mb-4">
        <DonutChart data={featureData} title="Features" />
        <DonutChart data={scenarioData} title="Scenarios" />
        <DonutChart data={stepData} title="Steps" />
      </div>
      {renderTable(tableData)}
    </div>
  );
};

export default JsonFileTable;