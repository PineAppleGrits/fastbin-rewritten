import AppTemplate from '@/components/AppTemplate';
import { NavigationItem } from '@/components/the-header/TheHeader';
import { Save } from '@geist-ui/react-icons';
import env from '@/lib/env';
import languages from '@/lib/languages';
import EditorWrapper from '@/components/editor-wrapper/EditorWrapper';
import React, { useEffect, useRef, useState } from 'react';
import upload from '@/lib/upload';
import { useToasts } from '@geist-ui/react';
import LoadingContainer from '@/components/loading-container/LoadingContainer';
import Mousetrap from 'mousetrap';
import globalKeyBind from '@/lib/globalKeyBind';
import { useRouter } from 'next/router';

interface ClonePageProps {
  contents: string;
  languageId: string;
}

const ClonePage = ({ contents, languageId }: ClonePageProps) => {
  const [ documentLanguage, _setDocumentLanguage ] = useState(languageId);
  const documentLanguageRef = useRef(languageId);
  const setDocumentLanguage = (l: string) => {
    _setDocumentLanguage(l);
    documentLanguageRef.current = l;
  };

  const [ uploading, setUploading ] = useState(false);

  const documentContents = useRef(contents);
  const setDocumentContents = (c: string) => documentContents.current = c;

  const [ toasts, setToast ] = useToasts();
  const router = useRouter();

  const save = async () => {
    if (uploading) {
      return;
    }

    setUploading(true);

    try {
      const key = await upload(documentContents.current, documentLanguage);

      setToast({
        text: 'Snippet created successfully! Redirecting...',
        type: 'success'
      });

      router.push(`/${key}`);
    } catch (err) {
      setUploading(false);

      setToast({
        text: `${err}`,
        type: 'error'
      });
    }
  };

  const navigation: NavigationItem[] = [
    {
      onClick: save,
      tooltip: 'Save (ctrl+s)',
      icon: Save
    }
  ];

  useEffect(() => {
    let mounted = true;
    globalKeyBind(Mousetrap);

    Mousetrap.bindGlobal('ctrl+s', e => {
      e.preventDefault();
      if (mounted) {
        save();
      }
    });

    return () => {
      (Mousetrap as any).unbindGlobal('ctrl+s');
      mounted = false;
    };
  }, []);

  return (
    <AppTemplate
      navigation={navigation}
      displayLanguages
      setDocumentLanguage={setDocumentLanguage}
    >
      <EditorWrapper
        contents={documentContents.current}
        setContents={setDocumentContents}
        language={documentLanguage}
      />

      {uploading && <LoadingContainer text="Creating snippet..." />}
    </AppTemplate>
  );
};

export default ClonePage;

export async function getServerSideProps({ params }) {
  let key = params.key;

  let languageId = 'plain';

  const components = key.split('.');
  if (components.length > 1) {
    const extension = components.pop();
    key = components.join('.');

    const targetLanguage = Object.values(languages)
      .find(l => l.extension === extension);

    if (targetLanguage) {
      languageId = targetLanguage.id;
    }
  }

  const baseUrl = env('site-url', true);

  const data = await fetch(`${baseUrl}/api/documents/${key}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  });

  const json = await data.json();

  if (!json.ok) {
    return {
      notFound: true
    };
  }

  const contents = json.contents;

  return {
    props: {
      contents,
      languageId
    }
  };
};
