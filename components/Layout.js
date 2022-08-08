import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="max-w-[1440px] m-auto">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
