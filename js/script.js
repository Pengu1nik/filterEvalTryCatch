const filterByType = (type, ...values) => values.filter(value => typeof value === type), // фильтрует поле данных переводя в тип данных и сравнивает их со значение в поле тип данных

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // присваивает переменной массив с блоками результата
		responseBlocksArray.forEach(block => block.style.display = 'none'); // каждый блок скрывает стилями
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks(); // вызывает функцию, в которой скрывает все ненужные блоки с результатами
		document.querySelector(blockSelector).style.display = 'block'; // блоку результата который был передан в функцию прописывается стиль display: block , теперь блок с результатами виден
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText; // если id текстового блока было передано, то в него записывается сообщение, которое было передано
		}
	}, // функция выводит на экран результат

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // вызывает функцию, в которую передает класс блока результата, сообщение и id текстового блока, свазанный с ошибкой (не найде)

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // вызывает функцию, в которую передает класс блока результата, сообщение и id текстового блока

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // вызывает функцию, в которую передает класс блока результата

	tryFilterByType = (type, values) => {
		try { 
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");  // присваение переменной valuesArray выполняет строку кода, которая фильтрует веденные данные с типом данных указанных в импуте. И соединяет их с помощью ,
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`; // присвоение переменной строки сообщения, если выполняется условие, что массив, не равен 0
			showResults(alertMsg); // вызывает функция, в которую передает строку с выявленными совпадениями по типам данных
		} catch (e) {
			showError(`Ошибка: ${e}`); // вызывает функцию в которую передает сообщение об ошибке (если данные введены не правильно)
		}
	};

const filterButton = document.querySelector('#filter-btn'); // присвоение переменной filterButton кнопки фильтровать

filterButton.addEventListener('click', e => {
	const typeInput = document.querySelector('#type'); // присвоение переменной typeInput поле тип данных
	const dataInput = document.querySelector('#data'); // присвоение переменной dataInput поле данные

	if (dataInput.value === '') { // если поле данных пустое, то
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // 1. устанавливается валидация, в которой описано, что не так
		showNoResults();	// 2. вызывается функция showNoResults (20 строка), о том, что поле пустое.
	} else { // если поле данных не пустое, то
		dataInput.setCustomValidity(''); // 1. устанавливается валидация, очищается строка валидации
		e.preventDefault(); // убирается обычное событие при клике
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // вызывается функция, в которую передается введенное значение поля типа данных и данных
	}
}); // Навешивание события click на кнопку фильтровать, при нажатии на неё срадатывает функция, в которую передается event
