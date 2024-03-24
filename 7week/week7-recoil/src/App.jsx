import "./App.css";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  jobsAtom,
  messagingAtom,
  networkAtom,
  notificationAtom,
} from "./store/atoms";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}
const MainApp = () => {
  const networkCount = useRecoilValue(networkAtom);
  const jobsCount = useRecoilValue(jobsAtom);
  const notificatonCount = useRecoilValue(notificationAtom);
  
  // const [messageCount, setMessagingCount] = useRecoilState(messagingAtom);
  const messageCount = useRecoilValue(messagingAtom);
  const setMessageCount = useSetRecoilState(messagingAtom);

  return (
    <>
      <button>Home</button>
      <button>
        My Network ({networkCount >= 100 ? `99+` : networkNotificationsCount})
      </button>
      <button>Jobs ({jobsCount})</button>
      <button>Messaging ({messageCount})</button>
      <button>Notifications ({notificatonCount})</button>
      <button onClick={() => setMessageCount((prev) => prev + 1)}>
        Inc message count
      </button>
    </>
  );
};


export default App;
