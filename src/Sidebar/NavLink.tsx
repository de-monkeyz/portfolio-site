import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";

interface PropTypes {
  href: string;
  exact?: boolean;
  className?: string;
}

const NavLink: React.FC<PropTypes> = ({ href, exact, children, ...props }) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className = (props.className ?? "") + " active";
  }

  return (
    <Link passHref={true} href={href}>
      <A {...props}>{children}</A>
    </Link>
  );
};

const A = styled.a`
  display: block;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--color-foreground);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }

  &.active {
    color: var(--color-secondary);
  }

  transition: color 0.2s ease-in-out;
`;

export default NavLink;
