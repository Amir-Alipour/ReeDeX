import "./Layout.css";
import Header from "./header/Header";

const Layout = () => {
    return (
        <div className="realative w-100 min-h-screen font-sans">
            {/* background animation section */}
            <div className="animation">
                <div className="base one"></div>
                <div className="base two"></div>
            </div>

            {/* header section */}
            <Header />

            {/* body section */}
            <div id="main" className="w-100 min-h-[90vh]"></div>
        </div>
    );
};

export default Layout;
