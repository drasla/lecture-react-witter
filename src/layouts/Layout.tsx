import { Link, Outlet, useNavigate } from "react-router";
import styled from "styled-components";
import { auth } from "../firebase.ts";
import { FaHome, FaRegUser, FaSignInAlt } from "react-icons/fa";

const Wrapper = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 4fr;
    height: 100%;
    padding: 50px 0;
    width: 100%;
    max-width: 860px;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const MenuItem = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    height: 35px;
    font-size: 16px;
    width: 35px;
    border-radius: 50%;
    svg {
        width: 30px;
        fill: white;
    }
    &.log-out {
        border-color: tomato;
        svg {
            fill: tomato;
        }
    }
`;

function Layout() {
    const navigate = useNavigate();
    const onLogOut = async () => {
        const ok = confirm("Are you sure you want to log out?");
        if (ok) {
            await auth.signOut();
            navigate("/login");
        }
    };

    return (
        <Wrapper>
            <Menu>
                <Link to="/">
                    <MenuItem>
                        <FaHome />
                    </MenuItem>
                </Link>
                <Link to="/profile">
                    <MenuItem>
                        <FaRegUser />
                    </MenuItem>
                </Link>
                <MenuItem onClick={onLogOut} className="log-out">
                    <FaSignInAlt />
                </MenuItem>
            </Menu>
            <Outlet />
        </Wrapper>
    );
}

export default Layout;
