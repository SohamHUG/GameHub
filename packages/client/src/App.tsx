import { Route, Routes } from "react-router-dom";
import MainTemplate from "./components/Templates/MainTemplate";
import { HomePage } from "./pages/Home/HomePage";

function App() {


    return (
        <>
            <Routes>
                <Route element={<MainTemplate />}>
                    <Route path="/" element={<HomePage />} />

                    {/* <Route path={'*'} element={<NotFound />} /> */}
                </Route>
            </Routes>
        </>
    )
}

export default App
