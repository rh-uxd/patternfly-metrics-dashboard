import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';

const Web: React.FunctionComponent = () => {
  useDocumentTitle("Web Metrics");

  return (
    <PageSection hasBodyWrapper={false}>
      <Title headingLevel="h1" size="lg">
        Web Metrics
      </Title>
    </PageSection>
  );

}

export { Web };