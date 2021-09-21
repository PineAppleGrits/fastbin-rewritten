import AppTemplate from '@/components/AppTemplate';
import Editor from '@/components/editor/Editor';

const ERROR_PAGE = `# Error 500

Something bad happened on the server side. Please check out the site later! If not, contact me!

https://discord.grits.tech/
`;

const InternalServerError = () => {
  return (
    <AppTemplate navigation={[]}>
      <Editor
        language="markdown"
        contents={ERROR_PAGE}
        readOnly
      />
    </AppTemplate>
  );
};

export default InternalServerError;
