import * as React from 'react';
import { useState } from 'react';
import { DropEvent, FileUpload, PageSection, Title } from '@patternfly/react-core';
import { InnerScrollContainer, Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

interface DataUploadProps {
  value: string;
  setValue: (value: string) => void;
  onDataParsed: (data: string) => void;
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
    onDataParsed(''); // Clear the parsed data as well
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

interface TeamTableProps {
  data: string;
  hasRightBorder: boolean;
}

const TeamTable: React.FunctionComponent<TeamTableProps> = ({ data, hasRightBorder }) => {
  return (
    <Table>
      <Thead>
        <Tr>
          {columnNames.map((column) => (
            <Th hasRightBorder={hasRightBorder} key={column}>{column}</Th>
          ))} 
        </Tr>
      </Thead>
      <Tbody>
        {Object.keys(data).map((teamName) => (
          <Tr key={teamName}>
            <Td hasRightBorder={hasRightBorder}>{teamName}</Td>
            {columnNames.slice(1).map((packageName) => (
              <Td key={packageName}>
                {data[teamName]?.[packageName]?.[0] || '-'}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

const Teams: React.FunctionComponent = () => {
  const [uploadValue, setUploadValue] = useState('');
  const [teamData, setTeamData] = useState('');

  const handleDataParsed = (parsedData: string) => {
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
      <InnerScrollContainer>
        <TeamTable
          data={teamData}
          hasRightBorder={true}
        />
      </InnerScrollContainer>
    </PageSection>
  );
};

export { Teams };
