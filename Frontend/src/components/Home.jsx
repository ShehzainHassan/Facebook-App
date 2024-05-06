import InputBox from "./InputBox";
import WritePost from "./WritePost";
const Home = () => {
  return (
    <div className=" min-w-screen-lg mx-auto lg:ml-20 px-4">
      <InputBox />
      <WritePost />
    </div>
  );
};

export default Home;
