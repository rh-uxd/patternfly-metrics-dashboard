import * as React from 'react';
import { useState } from 'react';
import { DropEvent, FileUpload, PageSection, Title } from '@patternfly/react-core';
import { InnerScrollContainer, Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

interface DataUploadProps {
  value: string;
  setValue: (value: string) => void;
  onDataParsed: (data: Array<string>) => void;
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
    onDataParsed([]); // Clear the parsed data as well
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
  data: Array<string>;
}

const TeamTable: React.FunctionComponent<TeamTableProps> = ({ data }) => {
  //const [activeSortIndex, setActiveSortIndex] = useState<number>(0);
  //const [activeSortDirection, setActiveSortDirection] = useState<'asc' | 'desc'>('asc');

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
  
/*   const getSortableRowValues = (row: string): (string | number)[] => {
    return ["Team Name", "@patternfly/patternfly", "@patternfly/quickstarts",
      "@patternfly/react-catalog-view-extension", "@patternfly/react-charts",
      "@patternfly/react-code-editor", "@patternfly/react-console", "@patternfly/react-core",
      "@patternfly/react-icons", "@patternfly/react-inline-edit-extension",
      "@patternfly/react-log-viewer", "@patternfly/react-data-view", "@patternfly/chatbot",
      "@patternfly/virtual-assistant", "@patternfly/react-component-groups", "@patternfly/react-styles",
      "@patternfly/react-table", "@patternfly/react-tokens", "@patternfly/react-topology",
      "@patternfly/react-user-feedback", "@patternfly/react-virtualized-extension", "react"];
  };
  
  let sortedTeams = Array.from(data);
  if (activeSortIndex !== null) {
    sortedTeams = data.sort((a, b) => {
      const aValue = getSortableRowValues(a)[activeSortIndex];
      const bValue = getSortableRowValues(b)[activeSortIndex];
      if (typeof aValue === 'number') {
        // Numeric sort
        if (activeSortDirection === 'asc') {
          return (aValue as number) - (bValue as number);
        }
        return (bValue as number) - (aValue as number);
      } else {
        // String sort
        if (activeSortDirection === 'asc') {
          return (aValue as string).localeCompare(bValue as string);
        }
        return (bValue as string).localeCompare(aValue as string);
      }
    });
  }
  
  const getSortParams = (columnIndex: number): ThProps['sort'] => ({
    sortBy: {
      index: activeSortIndex,
      direction: activeSortDirection,
      defaultDirection: 'asc' // starting sort direction when first sorting a column. Defaults to 'asc'
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index);
      setActiveSortDirection(direction);
    },
    columnIndex
  }); */

  return (
    <InnerScrollContainer>
    <Table>
      <Thead>
        <Tr>
          {columnNames.map((column) => (
            column === "Team Name" ? (
              <Th isStickyColumn hasRightBorder key={column} modifier="wrap">{column}</Th>
            ) : (
              <Th key={column} modifier="wrap">{column}</Th>
            )
          ))} 
        </Tr>
      </Thead>
      <Tbody>
        {Object.keys(data).map((teamName) => (
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
  const [teamData, setTeamData] = useState<Array<string>>([]);

  const handleDataParsed = (parsedData: Array<string>) => {
    setTeamData(parsedData);
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
