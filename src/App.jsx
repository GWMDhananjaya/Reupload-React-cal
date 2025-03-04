"use client";

import "flowbite/dist/flowbite.min.css";
import { useReducer, useState } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import { Modal } from "flowbite-react";
import { Banner } from "flowbite-react";
import { HiX, HiArrowRight } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";


export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAN: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};


function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.owerwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          owerwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.CLEAN:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.owerwrite) {
        return {
          ...state,
          owerwrite: false,
          currentOperand: null,
        };
      }

      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        owerwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperation(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,

    {}
  );
  const [openModal, setOpenModal] = useState(true);

  return (
    <div className="">
      <div>
        <>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  This is my first web hosting project, where I’ve demonstrated
                  the deployment of a ReactJS app using AWS S3, with Continuous
                  Integration and Continuous Deployment (CI/CD) via Jenkins. The
                  project also integrates AWS services for smooth and scalable
                  hosting.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Additionally, this project showcases modern DevOps practices,
                  highlighting the importance of automation in the development
                  and deployment process, ensuring efficient and reliable app
                  hosting.
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="flex justify-end">
                <HiArrowRight
                  className="h-5 w-5 text-gray-500 dark:text-gray-400 cursor-pointer"
                  onClick={() => setOpenModal(false)}
                />
              </div>
            </Modal.Footer>
          </Modal>
        </>
      </div>

      <div className="justify-center flex text-xl font-bold dart:text-white">
        <h1>
          React.js app deployed to S3 with CI/CD using Jenkins and AWS
        </h1>
      </div>
   
      <div className="">
        <div className="calculator-grid p-1">
          <div className="output">
            <div className="previous-operation">
              {formatOperation(previousOperand)} {operation}
            </div>
            <div className="current-operation">
              {formatOperation(currentOperand)}
            </div>
          </div>
          <button
            className="span-two"
            onClick={() => dispatch({ type: ACTIONS.CLEAN })}
          >
            AC
          </button>
          <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
            DEL
          </button>
          <OperationButton operation="/" dispatch={dispatch} />
          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />
          <OperationButton operation="*" dispatch={dispatch} />
          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />
          <OperationButton operation="+" dispatch={dispatch} />
          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />
          <OperationButton operation="-" dispatch={dispatch} />
          <DigitButton digit="." dispatch={dispatch} />
          <DigitButton digit="0" dispatch={dispatch} />
          <button
            className="span-two"
            onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          >
            =
          </button>
        </div>
      </div>
      <Banner className="p-6">
        <div className="flex w-full flex-col justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 md:flex-row">
          <div className="mb-4 md:mb-0 md:mr-4">
            <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
              This is my first web hosting project, showcasing a ReactJS app
              deployed to S3 with CI/CD using Jenkins and AWS.
            </h2>
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400"></p>
          </div>
          <div className="flex shrink-0 items-center">
            <a
              href="https://github.com/GWMDhananjaya"
              className="mr-3 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              <FaGithub className="mr-2 h-4 w-4" />
              GitHub
            </a>

            <Banner.CollapseButton
              color="gray"
              className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
            >
              <HiX className="h-4 w-4" />
            </Banner.CollapseButton>
          </div>
        </div>
      </Banner>
    </div>
  );
}

export default App;
