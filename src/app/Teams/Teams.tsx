import * as React from 'react';
import { useState } from 'react';
import { DropEvent, FileUpload, PageSection, Title } from '@patternfly/react-core';
import { InnerScrollContainer, Table, Tbody, Td, Th, ThProps, Thead, Tr } from '@patternfly/react-table';

type TeamData = Record<string, Record<string, string[]>>;

interface DataUploadProps {
  value: string;
  setValue: (value: string) => void;
  onDataParsed: (data: TeamData | unknown) => void;
}

const DataUpload: React.FunctionComponent<DataUploadProps> = ({ value, setValue, onDataParsed }) => {
  const [filename, setFilename] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleFileInputChange = (_, file: File) => {
    setFilename(file.name);
  };

  const handleDataChange = (_event: DropEvent, value: string) => {
    setValue(value);
    // Try to parse JSON and call onDataParsed
    try {
      const parsedData = JSON.parse(value);
      onDataParsed(parsedData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  const handleClear = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setFilename('');
    setValue('');
    onDataParsed({}); // Clear the parsed data as well
  };

  const handleFileReadStarted = (_event: DropEvent, _fileHandle: File) => {
    setIsLoading(true);
  };

  const handleFileReadFinished = (_event: DropEvent, _fileHandle: File) => {
    setIsLoading(false);
  };


  return (
    <FileUpload
      id="file-upload"
      type="text"
      value={value}
      filename={filename}
      filenamePlaceholder="Drag and drop a file or upload one"
      onFileInputChange={handleFileInputChange}
      onDataChange={handleDataChange}
      onReadStarted={handleFileReadStarted}
      onReadFinished={handleFileReadFinished}
      onClearClick={handleClear}
      isLoading={isLoading}
      allowEditingUploadedText={false}
      browseButtonText="Upload"
    />
  );
};

interface TeamTableProps {
  data: TeamData;
}

const TeamTable: React.FunctionComponent<TeamTableProps> = ({ data }) => {
  const [activeSortIndex, setActiveSortIndex] = useState<number | null>(null);
  const [activeSortDirection, setActiveSortDirection] = useState<'asc' | 'desc'>('asc');

  const columnNames = [
    "Team Name",
    "@patternfly/patternfly",
    "@patternfly/quickstarts",
    "@patternfly/react-catalog-view-extension",
    "@patternfly/react-charts",
    "@patternfly/react-code-editor",
    "@patternfly/react-console",
    "@patternfly/react-core",
    "@patternfly/react-icons",
    "@patternfly/react-inline-edit-extension",
    "@patternfly/react-log-viewer",
    "@patternfly/react-data-view",
    "@patternfly/chatbot",
    "@patternfly/virtual-assistant",
    "@patternfly/react-component-groups",
    "@patternfly/react-styles",
    "@patternfly/react-table",
    "@patternfly/react-tokens",
    "@patternfly/react-topology",
    "@patternfly/react-user-feedback",
    "@patternfly/react-virtualized-extension",
    "react"
  ];

  // Get the value for a specific team and column for sorting
  const getSortableRowValues = (teamName: string): (string | number)[] => {
    const values: (string | number)[] = [teamName]; // Start with team name
    
    // Add values for each package column
    columnNames.slice(1).forEach(packageName => {
      const value = data[teamName]?.[packageName]?.[0] || '-';
      // Try to parse as number for version strings, otherwise use as string
      const numericValue = parseFloat(String(value).replace(/[^0-9.]/g, ''));
      values.push(isNaN(numericValue) ? String(value) : numericValue);
    });
    
    return values;
  };
  
  // Sort the team names based on the active sort
  const sortedTeamNames = Object.keys(data).sort((a, b) => {
    if (activeSortIndex === null) return 0;
    
    const aValues = getSortableRowValues(a);
    const bValues = getSortableRowValues(b);
    const aValue = aValues[activeSortIndex];
    const bValue = bValues[activeSortIndex];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      // Numeric sort
      if (activeSortDirection === 'asc') {
        return aValue - bValue;
      }
      return bValue - aValue;
    } else {
      // String sort
      const aStr = String(aValue);
      const bStr = String(bValue);
      if (activeSortDirection === 'asc') {
        return aStr.localeCompare(bStr);
      }
      return bStr.localeCompare(aStr);
    }
  });
  
  const getSortParams = (columnIndex: number): ThProps['sort'] => ({
    sortBy: {
      index: activeSortIndex ?? undefined,
      direction: activeSortDirection,
      defaultDirection: 'asc'
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index);
      setActiveSortDirection(direction);
    },
    columnIndex
  });

  return (
    <InnerScrollContainer>
    <Table>
      <Thead>
        <Tr>
          {columnNames.map((column, columnIndex) => (
            column === "Team Name" ? (
              <Th 
                isStickyColumn 
                hasRightBorder 
                key={column} 
                modifier="wrap"
                sort={getSortParams(columnIndex)}
              >
                {column}
              </Th>
            ) : (
              <Th 
                key={column} 
                modifier="wrap"
                sort={getSortParams(columnIndex)}
              >
                {column}
              </Th>
            )
          ))} 
        </Tr>
      </Thead>
      <Tbody>
        {sortedTeamNames.map((teamName) => (
          <Tr key={teamName}>
            <Td isStickyColumn hasRightBorder>{teamName}</Td>
            {columnNames.slice(1).map((packageName) => (
              <Td key={packageName}>
                {data[teamName]?.[packageName]?.[0] || '-'}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
    </InnerScrollContainer>
  );
};

const Teams: React.FunctionComponent = () => {
  const [uploadValue, setUploadValue] = useState('');
  const [teamData, setTeamData] = useState<TeamData>({});

  const handleDataParsed = (parsedData: TeamData | unknown) => {
    // Type guard to check if parsedData is TeamData
    const isTeamData = (data: unknown): data is TeamData => {
      return typeof data === 'object' && data !== null && !Array.isArray(data);
    };

    if (Array.isArray(parsedData)) {
      // Handle case where data is an array - this might need adjustment based on actual data format
      console.warn('Received array data, expected object format');
      setTeamData({});
    } else if (isTeamData(parsedData)) {
      setTeamData(parsedData);
    } else {
      setTeamData({});
    }
  };

  return (
    <PageSection hasBodyWrapper={false}>
      <Title headingLevel="h1" size="lg">Teams Using PatternFly</Title>
      <DataUpload 
        value={uploadValue}
        setValue={setUploadValue}
        onDataParsed={handleDataParsed}
      />
      <TeamTable
        data={teamData}
      />
    </PageSection>
  );
};

export { Teams };
