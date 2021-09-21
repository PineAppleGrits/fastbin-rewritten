import AppTemplate from '@/components/AppTemplate';
import Editor from '@/components/editor/Editor';

import * as fs from 'fs-extra';
import * as path from 'path';

const About = ({ readme }: { readme: string }) => {
  return (
    <AppTemplate navigation={[]}>
      <Editor
        language="markdown"
        contents={readme}
        readOnly
      />
    </AppTemplate>
  );
};

export async function getStaticProps(ctx) {
  let readme = await fs.readFile(path.join(process.cwd(), 'README.md'), {
    encoding: 'utf8'
  });

  return {
    props: {
      readme
    }
  };
}

export default About;
