import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';

const Components: React.FunctionComponent = () => {
  useDocumentTitle("Component Metrics");

  return (
    <PageSection hasBodyWrapper={false}>
      <Title headingLevel="h1" size="lg">
        Component Metrics
      </Title>
    </PageSection>
  );

}

export { Components };