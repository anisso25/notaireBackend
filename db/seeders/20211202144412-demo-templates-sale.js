'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Real estate sale
		await queryInterface.bulkInsert('Templates', [
			{
				id: 6,
				CategoryId: 6,
				isPublished: true,
				content: `<h1 style="text-align:center">الجمهورية الجزائرية الديمقراطية الشعبية</h1>
				<p style="text-align:right"><span style="font-size:14pt">مكتب التوثيق</span></p>
				<p style="text-align:right"><strong>الأستاذ: <span class="custom-tag">_#_office.name_#_</span></strong></p>
				<p style="text-align:right"><strong>الفهرس: <span class="custom-tag">_#_document.reference_#_</span></strong></p>
				<p style="text-align:right"><strong>التاريـخ: <span class="custom-tag">_#_document.date_#_</span></strong></p>
				<h1 style="text-align:center"><span style="font-size:48px"><strong>عقد بيـــــــع عقار</strong></span></h1>
				<p>&nbsp;</p>
				<p style="text-align:right" class="dashed-ending">
					<span style="font-family:NotoNaskhArabic;">
						أمام الأستاذ: <span class="custom-tag">_#_office.name_#_</span>  موثق ب<span class="custom-tag">_#_office.address_#_</span>
					</span>
				</p>
				<h1 style="text-align:center"><span style="font-size:20px"><u><strong>حضـــــــــر(ت)</strong></u></span></h1>
				
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.34">
						<span class="custom-tag">_#_templateInputText.34_#_</span>
					</div>
				</p>
				<h3>الطرف الأول</h3>
				<h3 style="text-align:right">بصفته بائعا</h3>
				
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">حضر الطرف البائع وأعلن وهو يتمتع بكامل قواه العقلية و البدنية كما بدا لنا و بإرادته الحرة   و السليمة وصرح أنه باع العقار المعين أدناه و التزم بجميع الضمانات القانونية و العادية الجاري بها العمل فـي مثـل هـذا الـشـأن إلـى׃</span></p>
				
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.35">
						<span class="custom-tag">_#_templateInputText.35_#_</span>
					</div>
				</p>
				<h3>الطرف الثاني</h3>
				<h3 style="text-align:right">بصفته مشتريا</h3>
				
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">الحاضر مجلس هذا العقد و القابل بنفسه العقار الأتي تعيينه׃</span></p>
								
				<h3 style="text-align:center"><u><strong>التعييـــــــــــن</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.14">
						<span class="custom-tag">_#_templateInputText.14_#_</span>
					</div>
				</p>
				
				<h3 style="text-align:center"><u><strong>أصل الملكيــة</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.15">
						<span class="custom-tag">_#_templateInputText.15_#_</span>
					</div>
				</p>				
				
				<h3 style="text-align:center"><u><strong>الثمـــــــــــن</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.16">
						<span class="custom-tag">_#_templateInputText.16_#_</span>
					</div>
				</p>
				
				<h3 style="text-align:center"><u><strong>التأميــــــــــن</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.17">
						<span class="custom-tag">_#_templateInputText.17_#_</span>
					</div>
				</p>
				
				<h3 style="text-align:center"><u><strong>التكاليف والشــــــروط</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">إن هذا البيع تم تحت التكاليف والشروط الآتية والتي يلتزم  الطرف المشتري بتنفيذها والقيام بها وهي׃</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- أن يأخذ العقار المباع على حالته الراهنة من غير أن يكون له حق الرجوع على الطرف البائع لأي سبب كان.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- أن يتحمل الارتفاقات السلبية الظاهرة و الباطنة المستمرة و غير المستمرة المترتبة أو التي يمكن ترتيبها على العقار المبيع وله الحق في الاستفادة من الارتفاقات الإيجابية إن وجدت و ذلك على مسؤوليته، دون أن يمنح  هذا الشرط لأي كان حقوقا أكثر مما يستحقها بمقتضى سندات صحيحة لم تسقط بالتقادم أو بقانون الشهر العقاري.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- يسدد من يوم تملكه  العقار المبيع جميع المساهمات والأتاوات والضرائب والاشتراكات والتكاليف الأخرى المترتبة على العقار المبيع.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- وأخـيرا يؤدي جميع المصاريف والحقـوق والأتعاب التوثيقية الواجبة على هذا العقد وتوابعه القانونية و العادية.</span></p>				
				
				<h3 style="text-align:center"><u><strong>الشهر العقـــــــاري</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">ستـشهر نسخة من هذا العقد بالمـحافظة العقارية لبئر مراد رايس-ولاية الجزائر، بسعي من الموثق الممضي أسفله و على نفقات المشتري و إن ثبت من الشهادة التي تسلم اثر هذا الإجراء قيد رهن على العقار المبيع يجب على البائع العمل على رفع  اليد و شطب هذا القيد أثناء شهر من يوم الإبلاغ الذي يبلغ له بموطنه المختار و على نفقته.</span></p>
				
				<h3 style="text-align:center"><u><strong>تسليم المستنــــــــدات</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">يسلم للمشتري المعترف بذلك التسليم نسخة من عقد الملكية المحلل ولا يسلم له أي سند آخر قديم إذ يحل محل الطرف البائع في جميع حقوقه ودعاواه، بموجب هذا الحلول يكون له الحق في استخراج جميع ما يراه ضروريا من الوثائق والسندات كل ذلك على نفقته الخاصة.</span></p>

				<h3 style="text-align:center"><u><strong>تفويض خاص</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">لقد فوض الطرفان المذكوران أعلاه الموثق الموقع أدناه بإجراء أي تصحيح للأخطاء المادية التي تبرز في إطار تحرير هذا العقد ، سواء بإحالات أو تخريجات على الهامش دون المساس بالأمور الجوهرية للعقد، و كذلك يفوضان بموجب هذا العقد أي أحد من موظفي الأستاذ من أجل  تمثيلهما لدى كل المصالح الإدارية لا سيما الحفظ العقاري و مصالح مسح  الأراضي من أجل تسجيل و شهر هذا العقد.</span></p>


				<h3 style="text-align:center"><u><strong>الحالة المدنيــــــــة</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">صرح الطرف البائع تحت مسؤوليته أنه من جنسية جزائرية وأنه ليس تحت طائلة الحجر أو الإكراه أو التوقف عن الأداء أو الإفلاس وأنه ليس  في حالة يمكن محاكمته من أجل أرباح غير شرعية يمكن بسببها الأخذ الكلي أو الجزئي لأملاكه و لا تخضع للرهن القانوني الخاص لأملاكه العقارية وأن هذا العقار صاف وخال من أي دين، كما أضاف بأنه لم يتلق عقوبات لنقص أهليته المدنية والتي تمس بحقوقه الوطنية.</span></p>

				<h3 style="text-align:center"><u><strong>الموطــــــــــــن</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">من أجل تنفيذ هذا العقد، اختار كل واحد من الطرفين سكنه المذكور أعلاه موطنا معتادا له يمكن مخاطبته فيه عند الاقتضاء.</span></p>

				<h3 style="text-align:center"><u><strong>تلاوة القوانيـــــــــن</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">قبل ختم هذا العقد، تلا الموثق الممضي أسفله على مسامع الطرفين نصوص المواد 113، 118، 119، 133 و 134 من الأمـر رقم 76- 105 المؤرخ في التاسع ديسمبر سنة ألف وتسعمائة         و ستة و سبعين09/12/1976 المتضمن قانون التسجيل.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">و بعد استفسارهما من طرف الموثق الموقع أدناه، أكد الطرفان تحت طائلة العقوبات المنصوص عليها بالمادة: 134 من قانون التسجيل أن هذا العقد يتضمن القيمة الحقيقية للعقار المباع وزيادة على ذلك، فإن الموثق الموقع أدناه لا يعلم بأن هذا العقد وقع فــيه تعديل بسند مضاد يتضمن الزيادة في الثمن.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">يسجل ﻫﺫا العقد بمفتشية التسجيل والطابع لبئر مراد رايس-ولاية الجزائر.</span></p>

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
				id: 13,
				TemplateId: 6,
				EntityId: 1,
				name: 'البائع',
			},
			{
				id: 14,
				TemplateId: 6,
				EntityId: 1,
				name: 'المشتري',
			},
		]);

		await queryInterface.bulkInsert('TemplateInputTexts', [
			{
				id: 34,
				TemplateId: 6,
				TemplateEntityId: 13,
				name: 'البائع',
			},
			{
				id: 35,
				TemplateId: 6,
				TemplateEntityId: 14,
				name: 'المشتري',
			},
			{
				id: 14,
				TemplateId: 6,
				name: 'التعيين',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				شقة سكنية تابعة لعمارة ذات ملكية مشتركة ، كائنة ب: ،بلدية ___ ، ولاية ___، تقع بالطابق ___ ، تتكون من من ___ غرف ، مطبخ حمام ، مرحاض وملحقات ....
				</span>
      </p>`,
			},
			{
				id: 15,
				TemplateId: 6,
				name: 'أصل الملكيـة',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				تملكت السيد(ة): الطرف المؤجر العقار المذكور أعلاه عن طريق عقد بيع محرر لدى الأستاذ: موثق ب ___ ، ولاية الجزائر، بتاريخ ___
				</span>
      </p>`,
			},
			{
				id: 16,
				TemplateId: 6,
				name: 'الثمن',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				فضلا عما سبق بيانه من التكاليف والشروط وحق الاستغلال فإن هذا البيع تم بعد إيجاب وقبول الطرفين بثمن قدره: ___ أودع منه الخمس (1/5) المبلغ المقـدر بـ : ___ في حساب الموثق لدى الخزينة العمومية بولاية الجزائر، بتاريخ ___ وصل رقم ___ وأما الباقي فقد تم تسديده بالوسائل القانونية للوفاء للطرف البائع الذي اعترف أنه قبض هذا الثمن.
				</span>
      </p>`,
			},
			{
				id: 17,
				TemplateId: 6,
				name: 'التأمين',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				تم التأمين على العقار موضوع هذا العقد ضد الكوارث الطبيعية المحتمل حدوثها و هذا بموجب وثيقة التأمين  لدى "___ للتأمينات" رقم: ___ المؤرخة في ___.
				</span>
      </p>`,
			},
		]);

		// Boat sale
		await queryInterface.bulkInsert('Templates', [
			{
				id: 7,
				CategoryId: 7,
				isPublished: true,
				content: `<h1 style="text-align:center">الجمهورية الجزائرية الديمقراطية الشعبية</h1>
				<p style="text-align:right"><span style="font-size:14pt">مكتب التوثيق</span></p>
				<p style="text-align:right"><strong>الأستاذ: <span class="custom-tag">_#_office.name_#_</span></strong></p>
				<p style="text-align:right"><strong>الفهرس: <span class="custom-tag">_#_document.reference_#_</span></strong></p>
				<p style="text-align:right"><strong>التاريـخ: <span class="custom-tag">_#_document.date_#_</span></strong></p>
				<h1 style="text-align:center"><span style="font-size:48px"><strong>عقد بيـــع سفينة نزهة</strong></span></h1>
				<p>&nbsp;</p>
				<p style="text-align:right" class="dashed-ending">
					<span style="font-family:NotoNaskhArabic;">
						أمام الأستاذ: <span class="custom-tag">_#_office.name_#_</span>  موثق ب<span class="custom-tag">_#_office.address_#_</span>
					</span>
				</p>
				<h1 style="text-align:center"><span style="font-size:20px"><u><strong>حضـــــــــر(ت)</strong></u></span></h1>

				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.36">
						<span class="custom-tag">_#_templateInputText.36_#_</span>
					</div>
				</p>
				<h3>الطرف الأول</h3>
				<h3 style="text-align:right">بصفته بائعا</h3>

				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">االـذي صـرح أنـه بـاع بمـوجـب هـذا العقـد منقولا متمثلا في قارب سريع للنزهة مـع التزامـه بكافـة الضمانـات القانونيـة المعـمول بـها فـي مثـل هـذا الـشـأن إلـى ׃</span></p>				

				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.37">
						<span class="custom-tag">_#_templateInputText.37_#_</span>
					</div>
				</p>
				<h3>الطرف الثاني</h3>
				<h3 style="text-align:right">بصفته مشتريا</h3>
				
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">الحاضر مجلس هذا العقد والقابل سفينة النزهة هذه المبينة كما يلي׃</span></p>				
				
				<h3 style="text-align:center"><u><strong>التعييـــــــــــن</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.18">
						<span class="custom-tag">_#_templateInputText.18_#_</span>
					</div>
				</p>
				
				<h3 style="text-align:center"><u><strong>أصل الملكيــة</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.19">
						<span class="custom-tag">_#_templateInputText.19_#_</span>
					</div>
				</p>				
				
				<h3 style="text-align:center"><u><strong>الثمـــــــــــن</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.20">
						<span class="custom-tag">_#_templateInputText.20_#_</span>
					</div>
				</p>
				
				<h3 style="text-align:center"><u><strong>التأميــــــــــن</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.21">
						<span class="custom-tag">_#_templateInputText.21_#_</span>
					</div>
				</p>
				
				<h3 style="text-align:center"><u><strong>التكاليف والشــــــروط</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">إن هذا البيع تم تحت التكاليف والشروط الآتية والتي يلتزم  الطرف المشتري بتنفيذها والقيام بها وهي׃</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- أن يأخذ المنقول المباع على حالته الراهنة من غير أن يكون له حق الرجوع على الطرف البائع لأي سبب كان.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- يسدد من يوم تملكه للمنقول المبيع جميع الرسوم والضرائب والتكاليف الأخرى المترتبة على المنقول المبيع.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- وأخـيرا يؤدي جميع المصاريف والحقـوق والأتعاب التوثيقية الواجبة على هذا العقد وتوابعه القانونية و العادية.</span></p>				
				
				<h3 style="text-align:center"><u><strong>الملكية و الإنتفاع</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">يصير المشتري السيد: حائزا و مالكا للقارب المعين أعلاه من تاريخ تسجيله لدى المحطة البحرية الرئيسية للجزائر من دون أي تحفظ أو استثناء، فيكون له الحق في إستغلاله و التصرف فيه بجميع طرق التصرف القانونية مع مراعاة القانون البحري و النصوص التطبيقية له السارية المفعول و المطبقة على هذه الحالات خاصة قيدها بالمحطة البحرية و استخراج بطاقة الملاحة.</span></p>
				
				<h3 style="text-align:center"><u><strong>الحالة المدنيــــــــة</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">صرح البائع تحت مسئوليته أنه من جنسية جزائرية وأنه ليس تحت طائلة الحجر أو الإكراه أو التوقف عن الأداء والإفلاس وأنه ليس في حالة يمكن محاكمته من أجل أرباح غير شرعية يمكن بسببها الأخذ الكلي أو الجزئي لأملاكه.</span></p>

				<h3 style="text-align:center"><u><strong>الموطــــــــــــن</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">من أجل تنفيذ هذا العقد، اختار كل واحد من الطرفين سكنه المذكور أعلاه موطنا معتادا له يمكن مخاطبته فيه عند الاقتضاء..</span></p>

				<h3 style="text-align:center"><u><strong>حقوق الـتسجـيــل</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">تؤدى حقوق التسجيل طبقا للمادة: 208 من قانون التسجيل المعدل والمتمم.</span></p>
				
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
				id: 15,
				TemplateId: 7,
				EntityId: 1,
				name: 'البائع',
			},
			{
				id: 16,
				TemplateId: 7,
				EntityId: 1,
				name: 'المشتري',
			},
		]);

		await queryInterface.bulkInsert('TemplateInputTexts', [
			{
				id: 36,
				TemplateId: 7,
				TemplateEntityId: 15,
				name: 'البائع',
			},
			{
				id: 37,
				TemplateId: 7,
				TemplateEntityId: 16,
				name: 'المشتري',
			},
			{
				id: 18,
				TemplateId: 7,
				name: 'التعيين',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				النوع: سفينة نزهة المسماة: اسم السفينة ....
				</span>
      </p>`,
			},
			{
				id: 19,
				TemplateId: 7,
				name: 'أصل الملكيـة',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				تملك البائع المنقول المعين أعلاه بموجب شهادة مسلمة من المصلحة الوطنية لحراسة الشواطئ/ المحطة البحرية الرئيسية-الجزائر بتاريخ ___. وبموجب وثيقة ترخيص بالبيع رقم ___ الصادرة عن المحطة البحرية الرئيسية بالجزائر بتاريخ ___.
				</span>
      </p>`,
			},
			{
				id: 20,
				TemplateId: 7,
				name: 'الثمن',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				فضلا عما يتضمنه العقد من التكاليف والشروط وحق الاستغلال فإن هذا البيع تم بعد إيجاب وقبول الطرفين بثمن قدره: ___.
				</span>
      </p>`,
			},
			{
				id: 21,
				TemplateId: 7,
				name: 'التأمين',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				تم التأمين على المنقول موضوع هذا العقد ضد الكوارث الطبيعية المحتمل حدوثها و هذا بموجب وثيقة التأمين  لدى "___ للتأمينات" رقم: ___ المؤرخة في ___.
				</span>
      </p>`,
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {},
};
