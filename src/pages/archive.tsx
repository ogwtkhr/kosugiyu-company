import React from 'react';
import { BaseLayout, Meta } from '@/layouts';
import { ArchiveModule } from '@/modules';

const ArchivePage: React.FC = () => {
  return (
    <>
      <BaseLayout>
        <ArchiveModule />
      </BaseLayout>
    </>
  );
};

export default ArchivePage;
