import { HeaderContainer, Logo } from "@/styles";
import logo from "@/assets/logo.png";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <HeaderContainer>
      <Logo src={logo} alt="logo" />
    </HeaderContainer>
  );
};
