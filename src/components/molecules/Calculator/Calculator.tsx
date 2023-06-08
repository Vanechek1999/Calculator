import { useState, useEffect } from "react";

import classNames from "classnames";

import { observer } from "mobx-react-lite";
import fieldsValue from "../../../stores/fields-value";
import userStore from "../../../stores/user-store";

import Typography from "../../atoms/Typography/Typography";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import Paper from "../../atoms/Paper/Paper";
import Preloader from "../Preloader/Preloader";

import "./Calculator.scss";

const Calculator = observer(() => {
  const {
    fields,
    withoutData,
    addField,
    updateField,
    sortOfValue,
    getSum,
    resetFields,
    fullReset,
    showPreloader,
    stateOfPreloader,
  } = fieldsValue;
  const { storeUser } = userStore;
  const [activeStage, setActiveStage] = useState(1);

  useEffect(() => {
    switch (activeStage) {
      case 1:
        document.title = "Ввод данных";
        break;
      case 2:
        document.title = "Подтверждение даннх";
        break;
      case 3:
        document.title = "Результат";
    }
  }, [activeStage]);

  const handleClick = (increment: boolean) => {
    if (increment) {
      if (activeStage === 3) {
        return;
      } else return setActiveStage(activeStage + 1);
    } else {
      if (activeStage === 1) {
        return;
      }
      return setActiveStage(activeStage - 1);
    }
  };

  const fieldsContent = fields.map((input, index) => (
    <>
      <Paper top={{ all: 20 }}>
        <Typography weightDesktop={700} sizeDesktop={20} sizeMobile={16}>
          Число номер {input.id}
        </Typography>
        <Paper top={{ all: 12 }}>
          <Input
            key={input.id}
            id={String(input.id)}
            value={input.value}
            onChange={(e) => {
              if (Number.isNaN(Number(e.target.value))) {
                return;
              }
              updateField(String(input.id - 1), e.target.value);
            }}
          />
        </Paper>
      </Paper>
    </>
  ));

  return (
    <>
      <div className="Calculator">
        {storeUser.login && !showPreloader && (
          <>
            <Paper
              top={{ all: 20 }}
              left={{ all: 20 }}
              right={{ all: 20 }}
              display="flex"
            >
              <div
                className={classNames(
                  "Calculator-Stage Calculator-FirstStage",
                  activeStage === 1 && "Calculator-FirstStage_active"
                )}
              >
                <Typography
                  weightDesktop={700}
                  sizeDesktop={24}
                  sizeMobile={18}
                >
                  Ввод данных
                </Typography>
                {fieldsContent}
                <Paper top={{ all: 20 }}>
                  <Button
                    onClick={() => addField()}
                    xSpace={{ all: 20 }}
                    ySpace={{ all: 12 }}
                    color="white"
                    backGround="green"
                  >
                    Добавить число
                  </Button>
                </Paper>
              </div>
              <div
                className={classNames(
                  "Calculator-Stage Calculator-SecondStage",
                  activeStage === 2 && "Calculator-SecondStage_active"
                )}
              >
                <Typography>Подтверждение данных</Typography>
                <table className="Calculator-Table">
                  <tr>
                    <th>Номер числа</th>
                    <th>Введённое значение</th>
                  </tr>
                  {fields.map((field, index) => {
                    if (field.value) {
                      return (
                        <tr>
                          <td>{field.id}</td>
                          <td>{field.value}</td>
                        </tr>
                      );
                    }
                  })}
                </table>
                <Paper top={{ all: 20 }}>
                  <Typography display="block">Сортировать</Typography>
                  <Paper display="flex" top={{ all: 20 }}>
                    <Button
                      xSpace={{ all: 20 }}
                      ySpace={{ all: 12 }}
                      color="white"
                      backGround="blue"
                      onClick={() => sortOfValue("ascending")}
                    >
                      <Typography>По возрастанию</Typography>
                    </Button>
                    <Paper left={{ all: 20 }}>
                      <Button
                        xSpace={{ all: 20 }}
                        ySpace={{ all: 12 }}
                        color="white"
                        backGround="blue"
                        onClick={() => sortOfValue("descending")}
                      >
                        <Typography>По убыванию</Typography>
                      </Button>
                    </Paper>
                  </Paper>
                </Paper>
              </div>
              <div
                className={classNames(
                  "Calculator-Stage Calculator-ThirdStage",
                  activeStage === 3 && "Calculator-ThirdStage_active"
                )}
              >
                <Typography display="block">Результат</Typography>
                <Typography display="block">
                  Сумма ввёденных вам чисел:
                </Typography>{" "}
                {fields.map((field, index) => {
                  if (fields.length - 1 === index) {
                    return <Typography>{field.value}=</Typography>;
                  }
                  return <Typography>{field.value}+</Typography>;
                })}
                <Typography>{getSum()}</Typography>
              </div>
            </Paper>
            <Paper
              display="flex"
              left={{ all: 20 }}
              right={{ mobile: 20 }}
              top={{ all: 20 }}
              bottom={{ all: 20 }}
            >
              {activeStage === 3 ? (
                <Button
                  onClick={() => {
                    sortOfValue("default");
                    stateOfPreloader(true);
                    setTimeout(() => stateOfPreloader(false), 1000);
                    fullReset();
                    setActiveStage(1);
                  }}
                  xSpace={{ all: 20 }}
                  ySpace={{ all: 12 }}
                  backGround="green"
                  color="white"
                >
                  Произвести рассчёты снова
                </Button>
              ) : (
                <>
                  <Button
                    disabled={activeStage === 1}
                    xSpace={{ all: 20 }}
                    ySpace={{ all: 12 }}
                    backGround={activeStage === 1 ? "gray" : "green"}
                    color="white"
                    onClick={() => {
                      if (activeStage === 2) {
                        resetFields();
                      }
                      handleClick(false);
                    }}
                  >
                    Предыдущий шаг
                  </Button>
                  <Paper left={{ all: 20 }}>
                    <Button
                      disabled={activeStage === 1 && withoutData}
                      xSpace={{ all: 20 }}
                      ySpace={{ all: 12 }}
                      backGround={
                        activeStage === 1 && withoutData ? "gray" : "green"
                      }
                      color="white"
                      onClick={() => {
                        if (activeStage === 2) {
                          stateOfPreloader(true);
                          setTimeout(() => {
                            stateOfPreloader(false);
                          }, 5000);
                        }
                        handleClick(true);
                      }}
                    >
                      {activeStage === 2 ? "Рассчитать" : "Следующий шаг"}
                    </Button>
                  </Paper>
                </>
              )}
            </Paper>
          </>
        )}
      </div>
      <Preloader
        loading={showPreloader ? "show" : "hide"}
        inForm
        size="800px"
      />
    </>
  );
});

export default Calculator;
