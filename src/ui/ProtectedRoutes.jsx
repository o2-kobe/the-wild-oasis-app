import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

import PropTypes from "prop-types";
import { useEffect } from "react";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  //  1.Load the authenticated user
  const { isLoading, isAuthenicated } = useUser();

  // 2.If there is NO authenticated user, redirect to the login page
  useEffect(
    function () {
      if (!isAuthenicated && !isLoading) navigate("/login");
    },
    [isAuthenicated, isLoading, navigate]
  );

  // 3. Show a Spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4.If there is a user then render the app
  if (isAuthenicated) return children;
}

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoutes;
