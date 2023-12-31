"use client"

import "./Navbar.css"
import {
    useState,
} from "react"
import AccountDropdown from "../AccountDropdown/AccountDropdown"
import FilterDropdown from "../FilterDropdown/FilterDropdown"
import Hamburger from "./Hamburger";
import NavbarLink from "./NavbarLink";
import NavbarButtonDropdowns from "./NavbarButtonDropdowns";
import NavbarDropdown from "./NavbarDropdown";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { setCurrentRestaurant } from "@/redux/slices/currentRestaurant-slice"

export type DropdownStatus = "open" | "closed"

export default function Navbar() {

    const [hamburgerStatus, setHamburgerStatus] = useState<DropdownStatus>("closed")
    const pathname = usePathname()
    const dispatch = useDispatch()
    const closeHamburger = () => {
        setHamburgerStatus("closed")
    }

    const handleSEClick = () => {
        if (pathname == "/") {
            dispatch(setCurrentRestaurant({ currentRestaurant: undefined }))
        }
    }
    return (
        <nav className="position-fixed p-3 bg-white d-flex justify-content-center flex-wrap">
            <div className={`navbar__container ${hamburgerStatus == "open" && "navbar__container--open"} d-flex justify-content-between align-items-center`}>
                <Hamburger
                    hamburgerStatus={hamburgerStatus}
                    setHamburgerStatus={setHamburgerStatus}
                />
                <div className="d-flex align-items-center gap-4">
                    <Link href="/" onClick={handleSEClick} className="navbar__brand text-decoration-none m-0 d-flex align-items-center justify-content-center">
                        SpeedEats
                    </Link>
                    <NavbarLink
                        text="FAQ"
                        linkhref="/faq"
                    />
                    <NavbarLink
                        text="About"
                        linkhref="/about"
                    />
                </div>
                <NavbarButtonDropdowns
                    closeHamburger={closeHamburger}
                />
            </div>
            <NavbarDropdown
                hamburgerStatus={hamburgerStatus}
                closeHamburger={closeHamburger}
            />
        </nav>
    )
}
