import { CarpoolPostPage } from "../../components/CarpoolPostPage";
import PageContainer from "../../components/PageContainer";

export default function App() {
  return (
    <PageContainer>
      <>
        <div
          style={{
            width: "100%",
            maxWidth: 402,
            height: "100%",
            background: "#ffffff",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <CarpoolPostPage />
          </div>
        </div>
        <style>{`
          * {
            scrollbar-width: thin;
            scrollbar-color: #D0D7E0 transparent;
          }
          *::-webkit-scrollbar {
            width: 3px;
            height: 3px;
          }
          *::-webkit-scrollbar-track {
            background: transparent;
          }
          *::-webkit-scrollbar-thumb {
            background: #D0D7E0;
            border-radius: 99px;
          }
          *::-webkit-scrollbar-thumb:hover {
            background: #B0BAC8;
          }
        `}</style>
      </>
    </PageContainer>
  );
}
