import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="w-full items-center">
      {children}
      </div>
    </div>
  );
};

export default Layout;
