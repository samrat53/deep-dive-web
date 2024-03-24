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
  totalNotificationSelector,
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

  const totalNotficationCount=useRecoilValue(totalNotificationSelector);

  return (
    <>
      <button>Home ({totalNotficationCount})</button>
      <button>
        My Network ({networkCount >= 100 ? `99+` : networkCount})
      </button>
      <button>Jobs ({jobsCount})</button>
      <button>Messaging ({messageCount})</button>
      <button>Notifications ({notificatonCount})</button>
      <button onClick={() => setMessageCount((prev) => prev + 1)}>
        Inc message count ME
      </button>
      <h2>Total notfications={totalNotficationCount}</h2>
    </>
  );
};


export default App;
