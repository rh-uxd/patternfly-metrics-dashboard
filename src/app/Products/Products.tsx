import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';

const Products: React.FunctionComponent = () => {
  useDocumentTitle("Product Metrics");

  return (
    <PageSection hasBodyWrapper={false}>
      <Title headingLevel="h1" size="lg">
        Product Metrics
      </Title>
    </PageSection>
  );

}

export { Products };