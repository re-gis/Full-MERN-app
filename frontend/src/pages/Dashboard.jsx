import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../Components/GoalForm";
import Spinner from "../Components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../Components/GoalItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log("Error...");
    } else {
      if (!user) {
        navigate("/login");
      } else {
        dispatch(getGoals())
      }
    }
  }, [user, navigate, isError, message, dispatch]);

  if(isLoading) {
    return <Spinner />
  }


  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goal">
            {goals.map((goal) => {
              return <GoalItem key={goal._id} goal={goal} />
            })}
          </div>
        ) : (
          <h3>You have not set any goal...</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
