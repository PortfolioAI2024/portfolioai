"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { navLinks } from "@/constants.js";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <aside className="sidebar">
            <div className="flex size-full flex-col gap-4">
                <Link href="/" className="sidebar-logo" />
                <nav className="sidebar-nav">
                    <SignedIn>
                        <ul className="sidebar-nav_elements">
                            {navLinks.slice(0, 6).map((link) => {
                                const isActive = link.route === pathname;
                                return (
                                    <li
                                        key={link.route}
                                        className={`sidebar-nav_element group ${
                                            isActive
                                                ? "bg-purple-gradient text-white"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        <Link
                                            className="sidebar-link"
                                            href={link.route}
                                        >
                                            <Image
                                                src={link.icon}
                                                alt="logo"
                                                width={24}
                                                height={24}
                                                className={`${
                                                    isActive && "brightness-200"
                                                }`}
                                            />
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <ul>
                            {navLinks.slice(6).map((link) => {
                                const isActive = link.route === pathname;
                                return (
                                    <li
                                        key={link.route}
                                        className={`sidebar-nav_element group ${
                                            isActive
                                                ? "bg-purple-gradient text-white"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        <Link
                                            className="sidebar-link"
                                            href={link.route}
                                        >
                                            <Image
                                                src={link.icon}
                                                alt="logo"
                                                width={24}
                                                height={24}
                                                className={`${
                                                    isActive && "brightness-200"
                                                }`}
                                            />
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                            <li className="">
                                <UserButton afterSignOutUrl="/" showName />
                            </li>
                        </ul>
                    </SignedIn>
                    <SignedOut>
                        <Button
                            asChild
                            className="button bg-purple-gradient bg-cover "
                        >
                            <Link href="/sign-in">Login</Link>
                        </Button>
                    </SignedOut>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
