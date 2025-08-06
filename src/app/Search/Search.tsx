import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';

const Search: React.FunctionComponent = () => {
  useDocumentTitle("Search Metrics");

  return (
    <PageSection hasBodyWrapper={false}>
      <Title headingLevel="h1" size="lg">
        Search Metrics
      </Title>
    </PageSection>
  );

}

export { Search };