import React from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IFormula } from "../../types";
import classNames from "classnames";
import styles from "./Popup.module.scss";

interface IPopupProps {
    isOpen?: boolean;
    onClose: () => void;
    onAddFormula: (element: any) => void;
    selectedFormula?: IFormula;
}

const Popup: React.FC<IPopupProps> = ({
        isOpen,
        onClose,
        onAddFormula,
        selectedFormula,
    }) => {

    const [isResetBtnActive, setIsResetBtnActive] = React.useState(false);
    const [isSubmitBtnActive, setIsSubmitBtnActive] = React.useState(false);
    const [formulaElList, setFormulaElList] = React.useState<IFormula[]>([]);
    const [variablesList, setVariablesList] = React.useState([
        { id: 1, body: 'Число' },
        { id: 2, body: 'x'},
        { id: 3, body: 'y'},
        { id: 4, body: 'z'},
    ]);
    const [operatorsList, setOperatorsList] = React.useState([
        { id: 1, body: '+' },
        { id: 2, body: '-'},
        { id: 3, body: '*'},
        { id: 4, body: '/'},
        { id: 5, body: '('},
        { id: 6, body: ')'},
    ]);
    const [numberInputValue, setNumberInputValue] = React.useState('');

    React.useEffect(() => {
        if(isOpen) {
            setFormulaElList([]);
        }
      }, [isOpen]); 

    const dragStartHandler = (e: any, element: IFormula): void => {
        e.preventDefault();
        if (element) {
            const elements = [...formulaElList, element];
            setFormulaElList(elements);
            setIsResetBtnActive(true);
            setIsSubmitBtnActive(true);
            console.log(elements);
        }
    }

    const handleClickResetInput = (): void => {
        setFormulaElList([]);
        setIsResetBtnActive(false);
    }

    const fileRemove = (element: IFormula): void => {
        const updatedList = [...formulaElList];
        updatedList.splice(formulaElList.indexOf(element), 1);
        setFormulaElList(updatedList);
        if (updatedList.length === 0) {
            setIsResetBtnActive(false);
        }
    }

    const handleChangeNumber = (e: any): void => {
        setNumberInputValue(e.target.value);
    }

    const handleSubmit = (e: any): void => {
        e.preventDefault();
        const bodyFormulaEl = formulaElList.map(el => el.body === 'Число' ? numberInputValue : el.body).join('');
        onAddFormula({
            id: selectedFormula!.id,
            body: bodyFormulaEl,
        });
    }


	return (
        <div 
            className={classNames(
                styles.popup, 
                {[styles.popup_opened]: isOpen }
                )}
        >
            <div className={styles.popup__container}>
                <div className={styles.popup__header}>
                    <h2 className={styles.popup__title}>
                        Задать формулу
                    </h2>
                    <button 
                        className={styles.popup__close} 
                        type="button" 
                        aria-label="Закрыть модальное окно" 
                        onClick={onClose}>
                        <FontAwesomeIcon 
                            icon={faXmark}
                            style={{ color: '#fff' }}
                        />
                    </button>
                </div>
                <form 
                    className={styles.popup__form} 
                    name="forme-formula" 
                    onSubmit={handleSubmit} 
                    noValidate>
                    <div>
                        <fieldset className={styles.popup__formInputContainer}>
                            <section className={styles.popup__formVariables}>
                                <ul className={styles.popup__formList}>
                                    {variablesList.map((item) => {
                                        return (
                                            <li 
                                                className={styles.popup__formListItem}
                                                key={item.id}
                                                onDragStart={(e: any) => dragStartHandler(e, item)}
                                                draggable
                                            >
                                                {item.body}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </section>
                            <section className={styles.popup__formSection}>
                                <input 
                                    className={styles.popup__formInput} 
                                    type="text" 
                                    value={formulaElList.join('')}
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                    }} 
                                    name="formula" 
                                    id="formula"
                                />
                               {
                                    formulaElList.length > 0 ? (
                                        <div className={styles.popup__formDropPreview}>
                                            {
                                                formulaElList.map((item, index) => (
                                                    <div 
                                                        key={index} 
                                                        className={styles.popup__formDropPreviewItem}>
                                                        {item.body === "Число" 
                                                            ? (<input type="number" value={numberInputValue} onChange={handleChangeNumber} name="number" />)
                                                            : (<p>{item.body}</p>)
                                                        }
                                                        <button 
                                                            className={styles.popup__formDropPreviewItemDel} 
                                                            type="button" 
                                                            aria-label="Удалить элемент" 
                                                            onClick={() => fileRemove(item)}
                                                        >
                                                            <FontAwesomeIcon 
                                                                icon={faXmark}
                                                                style={{ color: '#ff2727' }}
                                                            />
                                                        </button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) : null
                                }
                            </section>
                            <section className={styles.popup__formOperators}>
                                <ul className={styles.popup__formList}>
                                    {operatorsList.map((item) => {
                                        return (
                                            <li 
                                                className={classNames(styles.popup__formListItem, 
                                                styles.popup__formListItem_padding)}
                                                key={item.id}
                                                onDragStart={(e: any) => dragStartHandler(e, item)}
                                                draggable
                                            >
                                                {item.body}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </section>
                        </fieldset> 
                    </div>
                    <fieldset className={styles.popup__formHandlers}>
                        <button 
                            type="button"
                            className={classNames(
                                styles.popup__formBtn,
                                {[styles.popup__formResetBtn_active]: isResetBtnActive }
                                )}
                            onClick={handleClickResetInput}
                        >
                            Отмена
                        </button>
                        <button 
                            type="submit" 
                            className={classNames(
                                styles.popup__formBtn, 
                                styles.popup__formBtn_bg,
                                {[styles.popup__formSubmitBtn_active]: isSubmitBtnActive }
                                )}
                        >
                            Сохранить
                        </button>
                    </fieldset>
                </form>
            </div>
      </div>
	);
}

export default Popup;