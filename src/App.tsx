import { useEffect, useRef, useState } from 'react';

function App() {
  const iframe1Ref = useRef<HTMLIFrameElement>(null);
  const iframe2Ref = useRef<HTMLIFrameElement>(null);
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.from === 'iframe1') {
        setMessage(event.data.message);
        iframe2Ref.current?.contentWindow?.postMessage(
          { from: 'parent', to: 'iframe2', message: event.data.message },
          '*'
        );
      }

      if (event.data?.from === 'iframe2') {
        setMessage2(event.data.message);
        iframe1Ref.current?.contentWindow?.postMessage(
          { from: 'parent', to: 'iframe1', message: event.data.message },
          '*'
        );
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <>
      <h1>3D CAD設計画面</h1>
      <p>検索画面から送信されたデータ。設計画面に送信する。: {message}</p>
      <p>設計画面から送信されたデータ。検索画面に送信する。: {message2}</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <iframe ref={iframe1Ref} src="/react-iframe/page1.html" width={600} height={300} />
        <iframe ref={iframe2Ref} src="/react-iframe/page2.html" width={600} height={300} />
      </div>
    </>
  );
}

export default App;
