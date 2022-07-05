'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		// ======= General Procuration =======
		await queryInterface.bulkInsert('Templates', [
			{
				id: 1,
				CategoryId: 1,
				isPublished: true,
				content: `<h1 style="text-align:center">الجمهورية الجزائرية الديمقراطية الشعبية</h1>
        <p style="text-align:right"><span style="font-size:14pt">مكتب التوثيق</span></p>
        <p style="text-align:right"><strong>الأستاذ: <span class="custom-tag">_#_office.name_#_</span></strong></p>
        <p style="text-align:right"><strong>الفهرس: <span class="custom-tag">_#_document.reference_#_</span></strong></p>
        <p style="text-align:right"><strong>التاريـخ: <span class="custom-tag">_#_document.date_#_</span></strong></p>
        <h1 style="text-align:center"><span style="font-size:48px"><strong>وكالة عامة</strong></span></h1>
        <p>&nbsp;</p>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            أمام الأستاذ: <span class="custom-tag">_#_office.name_#_</span>  موثق ب<span class="custom-tag">_#_office.address_#_</span>
          </span>
        </p>
        <h1 style="text-align:center"><span style="font-size:20px"><u><strong>حضـــــــــر(ت)</strong></u></span></h1>

        <p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.22">
						<span class="custom-tag">_#_templateInputText.22_#_</span>
					</div>
				</p>
        <h3>الطرف الموكل</h3>

        <p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.23">
						<span class="custom-tag">_#_templateInputText.23_#_</span>
					</div>
				</p>
        <h3>الطرف الوكيل</h3>
        
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            الحاضر عن مجلس هذا العقد ليقوم بما يلي
          </span>
        </p>
        <p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.1">
						<span class="custom-tag">_#_templateInputText.1_#_</span>
					</div>
				</p>
        <h2 style="text-align:center"><u><strong>انتهاء الوكالـــة</strong></u></h2>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            تنتهي الوكالة بإتمام العمل الموكل به أو بانتهاء الأجل المعين للوكالة، وتنتهي أيضا بوفاة أحد الطرفين كما تنتهي الوكالة أيضا بعزل الوكيل أو بعدول الموكل أو الوكيل وهذا طبقا لنص المادة 586 من القانون المدني الجزائري
          </span>
        </p>
        <h2 style="text-align:center"><u><strong>حقوق الـتسجـيــل</strong></u></h2>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            تؤدى حقوق التسجيل طبقا للمادة 208 من قانون التسجيل المعدل والمتمم
          </span>
        </p>
        <h2 style="text-align:center"><u><strong>إثباتا لما ذكر</strong></u></h2>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            حرر و انعقد بمكتب التوثيق المذكور أعلاه <span class="custom-tag">_#_document.date(string)_#_</span> (<span class="custom-tag">_#_document.date_#_</span>).
          </span>
        </p>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            و بعد التلاوة وقع الطرفان ثم وقع الموثق أدناه
          </span>
        </p>
        <h3>الموثــــــق</h3>`,
			},
		]);

		await queryInterface.bulkInsert('TemplateEntities', [
			{
				id: 1,
				TemplateId: 1,
				EntityId: 1,
				name: 'الموكل',
			},
			{
				id: 2,
				TemplateId: 1,
				EntityId: 1,
				name: 'الوكيل',
			},
		]);

		await queryInterface.bulkInsert('TemplateInputTexts', [
			{
				id: 22,
				TemplateId: 1,
				TemplateEntityId: 1,
				name: 'الطرف الموكل',
			},
			{
				id: 23,
				TemplateId: 1,
				TemplateEntityId: 2,
				name: 'الطرف الوكيل',
			},
			{
				id: 1,
				TemplateId: 1,
				name: 'مهام الوكيل',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            ____
          </span>
        </p>`,
			},
		]);

		// ======= Car Procuration =======
		await queryInterface.bulkInsert('Templates', [
			{
				id: 2,
				CategoryId: 2,
				isPublished: true,
				content: `<h1 style="text-align:center">الجمهورية الجزائرية الديمقراطية الشعبية</h1>
        <p style="text-align:right"><span style="font-size:14pt">مكتب التوثيق</span></p>
        <p style="text-align:right"><strong>الأستاذ: <span class="custom-tag">_#_office.name_#_</span></strong></p>
        <p style="text-align:right"><strong>الفهرس: <span class="custom-tag">_#_document.reference_#_</span></strong></p>
        <p style="text-align:right"><strong>التاريـخ: <span class="custom-tag">_#_document.date_#_</span></strong></p>
        <h1 style="text-align:center"><span style="font-size:48px"><strong>وكالة خاصة</strong></span></h1>
        <p>&nbsp;</p>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            أمام الأستاذ: <span class="custom-tag">_#_office.name_#_</span>  موثق ب<span class="custom-tag">_#_office.address_#_</span>
          </span>
        </p>
        <h1 style="text-align:center"><span style="font-size:20px"><u><strong>حضـــــــــر(ت)</strong></u></span></h1>
        
        <p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.24">
						<span class="custom-tag">_#_templateInputText.24_#_</span>
					</div>
				</p>
        <h3>الطرف الموكل</h3>

        <p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.25">
						<span class="custom-tag">_#_templateInputText.25_#_</span>
					</div>
				</p>
        <h3>الطرف الوكيل</h3>
        
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            الحاضر عن مجلس هذا العقد ليقوم بما يلي
          </span>
        </p>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            استعمال السيارة ذات المواصفات التالية:
          </span>
        </p>
        
        <p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.26">
						<span class="custom-tag">_#_templateInputText.26_#_</span>
					</div>
				</p>

        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            هذه المواصفات تضمنتها البطاقة الرمادية (نسخة منها تبقى مرفقة بأصل هذا العقد)
          </span>
        </p>
        
        <p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.2">
						<span class="custom-tag">_#_templateInputText.2_#_</span>
					</div>
				</p>
        
        <h2 style="text-align:center"><u><strong>انتهاء الوكالـــة</strong></u></h2>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            تنتهي الوكالة بإتمام العمل الموكل به أو بانتهاء الأجل المعين للوكالة، تنتهي أيضا بوفاة أحد الطرفين كما تنتهي الوكالة أيضا بعزل الوكيل أو بعدول الموكل أو الوكيل وهذا طبقا لنص المادة 586 من القانون المدني الجزائري
          </span>
        </p>
        <h2 style="text-align:center"><u><strong>حقوق الـتسجـيــل</strong></u></h2>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            تؤدى حقوق التسجيل طبقا للمادة 208 من قانون التسجيل المعدل والمتمم
          </span>
        </p>
        <h2 style="text-align:center"><u><strong>إثباتا لما ذكر</strong></u></h2>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            حرر و انعقد بمكتب التوثيق المذكور أعلاه <span class="custom-tag">_#_document.date(string)_#_</span> (<span class="custom-tag">_#_document.date_#_</span>).
          </span>
        </p>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            و بعد التلاوة وقع الطرفان ثم وقع الموثق أدناه
          </span>
        </p>
        <h3>الموثــــــق</h3>`,
			},
		]);

		await queryInterface.bulkInsert('TemplateEntities', [
			{
				id: 3,
				TemplateId: 2,
				EntityId: 1,
				name: 'الموكل',
			},
			{
				id: 4,
				TemplateId: 2,
				EntityId: 1,
				name: 'الوكيل',
			},
			{
				id: 5,
				TemplateId: 2,
				EntityId: 5,
				name: 'السيارة',
			},
		]);

		await queryInterface.bulkInsert('TemplateInputTexts', [
			{
				id: 24,
				TemplateId: 2,
				TemplateEntityId: 3,
				name: 'الطرف الموكل',
			},
			{
				id: 25,
				TemplateId: 2,
				TemplateEntityId: 4,
				name: 'الطرف الوكيل',
			},
			{
				id: 26,
				TemplateId: 2,
				TemplateEntityId: 5,
				name: 'السيارة',
			},
			{
				id: 2,
				TemplateId: 2,
				name: 'مهام الوكيل',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            يقوم الوكيل بقيادة السيارة المذكورة أعلاه داخل و خارج التراب الوطني و يقوم بجميع الإجراءات الإدارية المرتبطة بذلك و تمثيلها أمام جميع السلطات الإدارية و الأمنية من شرطة أو درك وطني،&nbsp; أو جمارك و التوقيع على كل وثيقة لها صلة بالسيارة من إيداع أو سحب أي مستند
          </span>
        </p>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            يقوم الوكيل بالإشراف على السيارة المذكورة إشراف الشخص العادي في هذا الإطار
          </span>
        </p>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            يقوم الوكيل بإبرام عقود التأمين اللازمة و تحمل مسؤولية الأضرار الناجمة عن هذا الاستعمال و قبض التعويضات
          </span>
        </p>`,
			},
		]);

		// ======= Fridha Procuration =======
		await queryInterface.bulkInsert('Templates', [
			{
				id: 3,
				CategoryId: 3,
				isPublished: true,
				content: `<h1 style="text-align:center">الجمهورية الجزائرية الديمقراطية الشعبية</h1>
        <p style="text-align:right"><span style="font-size:14pt">مكتب التوثيق</span></p>
        <p style="text-align:right"><strong>الأستاذ: <span class="custom-tag">_#_office.name_#_</span></strong></p>
        <p style="text-align:right"><strong>الفهرس: <span class="custom-tag">_#_document.reference_#_</span></strong></p>
        <p style="text-align:right"><strong>التاريـخ: <span class="custom-tag">_#_document.date_#_</span></strong></p>
        <h1 style="text-align:center"><span style="font-size:48px"><strong>وكالة</strong></span></h1>
        <p>&nbsp;</p>
        
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            أمام الأستاذ: <span class="custom-tag">_#_office.name_#_</span>  موثق ب<span class="custom-tag">_#_office.address_#_</span>
          </span>
        </p>
        
        <h1 style="text-align:center"><span style="font-size:20px"><u><strong>حضـــــــــر(ت)</strong></u></span></h1>
        
        <p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.27">
						<span class="custom-tag">_#_templateInputText.27_#_</span>
					</div>
				</p>
        <h3>الطرف الموكل</h3>

        <p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.28">
						<span class="custom-tag">_#_templateInputText.28_#_</span>
					</div>
				</p>
        <h3>الطرف الوكيل</h3>
        
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            الحاضر عن مجلس هذا العقد ليقوم بما يلي
          </span>
        </p>
        <p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.3">
						<span class="custom-tag">_#_templateInputText.3_#_</span>
					</div>
				</p>
        
        <p class="right bold" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            الـــذين صرحـــــــــوا بـــمـوجــــــــــب هـــــــــذا الـعـقــــــد أنهــم وكــــلوا و أنــابـــــوا عنهم
          </span>
        </p>
        <p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.29">
						<span class="custom-tag">_#_templateInputText.29_#_</span>
					</div>
				</p>
        <h2 style="text-align:center"><u><strong>انتهاء الوكالـــة</strong></u></h2>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            تنتهي الوكالة بإتمام العمل الموكل به أو بانتهاء الأجل المعين للوكالة، وتنتهي أيضا بوفاة أحد الطرفين كما تنتهي الوكالة أيضا بعزل الوكيل أو بعدول الموكل أو الوكيل وهذا طبقا لنص المادة 586 من القانون المدني الجزائري
          </span>
        </p>
        
        <h2 style="text-align:center"><u><strong>حقوق الـتسجـيــل</strong></u></h2>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            تؤدى حقوق التسجيل طبقا للمادة: 208 من قانون التسجيل المعدل والمتمم
          </span>
        </p>
        
        <h2 style="text-align:center"><u><strong>إثباتا لما ذكر</strong></u></h2>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            حرر و انعقد بمكتب التوثيق المذكور أعلاه <span class="custom-tag">_#_document.date(string)_#_</span> (<span class="custom-tag">_#_document.date_#_</span>).
          </span>
        </p>
        <p style="text-align:right" class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            و بعد التلاوة وقع الطرفان ثم وقع الموثق أدناه
          </span>
        </p>
        <h3>الموثــــــق</h3>`,
			},
		]);

		await queryInterface.bulkInsert('TemplateEntities', [
			{
				id: 6,
				TemplateId: 3,
				EntityId: 1,
				name: 'الموكل',
			},
			{
				id: 7,
				TemplateId: 3,
				EntityId: 1,
				name: 'الوكيل',
			},
			{
				id: 8,
				TemplateId: 3,
				EntityId: 6,
				name: 'الفريضة',
			},
		]);

		await queryInterface.bulkInsert('TemplateInputTexts', [
			{
				id: 27,
				TemplateId: 3,
				TemplateEntityId: 6,
				name: 'الطرف الموكل',
			},
			{
				id: 28,
				TemplateId: 3,
				TemplateEntityId: 7,
				name: 'الطرف الوكيل',
			},
			{
				id: 29,
				TemplateId: 3,
				TemplateEntityId: 8,
				name: 'الفريضة',
			},
			{
				id: 3,
				TemplateId: 3,
				name: 'مهام الوكيل',
				defaultValue: `<p class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            إشراف الشخص العادي على أية عقارات فيما يؤول إليهم من مورثهم المرحوم الاسم واللقب- تمثيلهم أمام المصالح الإدارية المختلفة (البلدية، الدائرة، الولاية و غيرها) من أجل إيداع أو سحب أو إمضاء أية وثيقة لها علاقة بموضوع هذا العقد.
          </span>
        </p>
        <p class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            تمثيلهم أمام المصالح الإدارية المختلفة (البلدية، الدائرة، الولاية و غيرها) من أجل إيداع أو سحب أو إمضاء أية وثيقة لها علاقة بموضوع هذا العقد .
          </span>
        </p>
        <p class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            تمثيلهم إن استدعت الضرورة أمام مصالح الضرائب المعنية لتسوية الوضعية الجبائية لأي عقار و كل ما يتطلبه الأمر في مثل هذا الشأن من دفع مبالغ مالية وإيداع أو سحب أو إمضاء أية وثيقة.
          </span>
        </p>
        <p class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            القيام بإيداع أو سحب أو إمضاء كل السندات و الوثائق من مختلف الإدارات العمومية، التي لها علاقة بموضوع الوكالة، حالا أو مستقبلا.
          </span>
        </p>
        <p class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            القيام بإبرام عقود التأمين اللازمة و تحمل مسؤولية الأضرار الناجمة عن هذا الاستعمال و قبض التعويضات عن الحوادث و القيام مقامه بجميع الإجراءات القانونية أمام جميع السلطات و التوقيع على كل وثيقة تتعلق بهذا الشأن.
          </span>
        </p>
        <p class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            تمثيلهم لدى مصالح أملاك الدولة إن استدعت الضرورة ذلك لإيداع أو سحب أو إمضاء أية وثائق أو مستندات.
          </span>
        </p>
        <p class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            تمثيلهم لدى مصالح مسح الأراضي إن استدعت الضرورة ذلك لاستخراج أية وثائق أو سندات متعلقة بأي عقار يؤول إلى مورثهم.
          </span>
        </p>
        <p class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            تمثيلهم لدى المحافظة العقارية المختصة في حالة الضرورة و هذا من أجل إيداع أو سحب أو إمضاء أية وثائق أو مستندات و بالخصوص استخراج الدفتر العقاري .
          </span>
        </p>
        <p class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            تمثيلهم أمام أي محضر قضائي أو أي خبير عقاري من أجل إيداع أو سحب أو إمضاء أي وثائق أو مستندات متعلقة بأي عقار يؤول إلى مورثهم.
          </span>
        </p>
        <p class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            تمثيلهم إن اقتضت الضرورة لدى كل هيئات الأمن و القضاء الوطنية بجميع درجاتها (المحاكم، مجالس القضاء، المحكمة العليا، المحكمة الإدارية ، مجلس الدولة) من أجل الدفاع عن كل حقوقها سواء كانت مدعية أو مدعى عليه، حضور كل الجلســــــــــــــــات و إيداع الدعاوي و الوثائق و المستندات، تعيين أي محام إذا اقتضى الأمر من أجل تولي مهمة الدفاع.
          </span>
        </p>
        <p class="dashed-ending">
          <span style="font-family:NotoNaskhArabic;">
            دفع إتاوات الماء و الكهرباء و الغاز و البريد و المواصلات و استخراج أي وثيقـــــة من الإدارات والمؤسسات المعنية بهذا الموضوع.
          </span>
        </p>`,
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('TemplateInputTexts', null, {});
		await queryInterface.bulkDelete('TemplateEntities', null, {});
		await queryInterface.bulkDelete('Templates', null, {});
	},
};
