import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import { formPositionAddMariachi } from '@redux/mariachi/mariachi.actions'
import { Button } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const FormSteps = ({ options, formsTemplete, handleSaveData }) => {
  const { loadingCoordinator, loadingNewMariachi } = useSelector(
    (state) => state.NewMariachi
  )
  const dispatch = useDispatch()
  const [step, setStep] = useState(0)
  const [option, setOption] = useState(options)

  useEffect(() => {
    if (step === 0) {
      option[step].active = true
      setOption(options)
    }
    dispatch(formPositionAddMariachi(step))
  }, [step])

  const handleStep = (index) => {
    setStep(index)
    option[index].active = true
    setOption(option)
  }

  const handleNextStep = () => {
    if (step < option.length - 1) {
      setStep(step + 1)
      option[step + 1].active = true
      setOption(option)
    }
  }

  const handleBeforeStep = () => {
    if (step > 0) {
      setStep(step - 1)
      // option[step - 1].active = false
      // setOption(option)
    }
  }

  // step-done

  return (
    <div className="mdl-card">
      <div className="mdl-card__supporting-text">
        <div className="mdl-stepper-horizontal-alternative">
          {option.map((opt, index) => (
            <div
              className={
                index === step
                  ? `mdl-stepper-step active-step current_active`
                  : opt.active
                  ? `mdl-stepper-step active-step`
                  : `mdl-stepper-step `
              }
              key={index}
              onClick={() => handleStep(index)}
            >
              <div className="mdl-stepper-circle">
                <span>{index + 1}</span>
              </div>
              <div className="mdl-stepper-title">{opt.step}</div>
              {opt.optional && (
                <div className="mdl-stepper-optional">Opcional</div>
              )}
              <div
                className={
                  opt.active
                    ? 'mdl-stepper-bar-left mdl-stepper-bar-color'
                    : 'mdl-stepper-bar-left'
                }
              ></div>
              <div
                className={
                  opt.active
                    ? 'mdl-stepper-bar-right mdl-stepper-bar-color'
                    : 'mdl-stepper-bar-right'
                }
              ></div>
            </div>
          ))}
        </div>

        {formsTemplete[step]}

        <div className={'mdl-stepper-next-before'}>
          <NavigateBeforeIcon
            onClick={handleBeforeStep}
            style={{ color: '#000', fontSize: '20px', cursor: 'pointer' }}
          />
          {/* <AssignmentTurnedInIcon
            style={{ color: "#555", fontSize: "20px", cursor: "pointer" }}
          /> */}
          <NavigateNextIcon
            onClick={handleNextStep}
            style={{ color: '#000', fontSize: '20px', cursor: 'pointer' }}
          />
        </div>
      </div>

      <div className="mdl-button">
        <Button
          variant="contained"
          color="primary"
          classname="md-button"
          startIcon={<CloudUploadIcon />}
          disabled={step !== 3 || loadingCoordinator || loadingNewMariachi}
          onClick={handleSaveData}
        >
          Guardar
        </Button>
      </div>
      <style jsx>{`
        .mdl-stepper-next-before {
          display: flex;
          justify-content: space-between;
          margin-top: 10vh;
        }
        .ml-stepper-current-active {
          background-color: #757575;
        }
        .mdl-button {
        }

        .mdl-button > button {
          margin-top: 5vh;
          width: 100%;
        }

        strong {
          margin-left: 10px;
        }
        .ml-button-dis {
          disabled: false;
        }
      `}</style>
    </div>
  )
}

export default FormSteps
