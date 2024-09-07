"use client"

import React, { useState, ChangeEvent } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';

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
      {renderTable(tableData)}
    </div>
  );
};

export default JsonFileTable;