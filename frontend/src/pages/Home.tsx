import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home(){
    return(
        <div>
            <Link to="/signin">
                <Button>Log In</Button>
            </Link>
        </div>
    );
}