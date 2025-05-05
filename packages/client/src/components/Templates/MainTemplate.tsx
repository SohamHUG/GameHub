import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

const MainTemplate: FunctionComponent = () => {

    return (
        <div className="w-full min-h-screen">

            <main>
                <Outlet />
            </main>

        </div>
    )
}

export default MainTemplate;