'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Residential rent
		await queryInterface.bulkInsert('Templates', [
			{
				id: 4,
				CategoryId: 4,
				isPublished: true,
				content: `<h1 style="text-align:center">الجمهورية الجزائرية الديمقراطية الشعبية</h1>
				<p style="text-align:right"><span style="font-size:14pt">مكتب التوثيق</span></p>
				<p style="text-align:right"><strong>الأستاذ: <span class="custom-tag">_#_office.name_#_</span></strong></p>
				<p style="text-align:right"><strong>الفهرس: <span class="custom-tag">_#_document.reference_#_</span></strong></p>
				<p style="text-align:right"><strong>التاريـخ: <span class="custom-tag">_#_document.date_#_</span></strong></p>
				<h1 style="text-align:center"><span style="font-size:48px"><strong>عقد إيجار سكني</strong></span></h1>
				<p>&nbsp;</p>
				<p style="text-align:right" class="dashed-ending">
					<span style="font-family:NotoNaskhArabic;">
						أمام الأستاذ: <span class="custom-tag">_#_office.name_#_</span>  موثق ب<span class="custom-tag">_#_office.address_#_</span>
					</span>
				</p>
				<h1 style="text-align:center"><span style="font-size:20px"><u><strong>حضـــــــــر(ت)</strong></u></span></h1>
				
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.30">
						<span class="custom-tag">_#_templateInputText.30_#_</span>
					</div>
				</p>
				<h3>الطرف الأول</h3>
				<h3 style="text-align:right">بصفته مؤجر</h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.31">
						<span class="custom-tag">_#_templateInputText.31_#_</span>
					</div>
				</p>
				<h3>الطرف الثاني</h3>
				<h3 style="text-align:right">بصفته مستأجر</h3>
				
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">وقد صرح الطرفان  برغبتهما في إبرام عقد إيجار كما يأتي ذكره فيما يلي׃</span></p>
				
				<h3 style="text-align:center"><u><strong>الهدف</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">يؤجر الطرف الأول مسكنه، إلى الطرف الثاني لغرض سكني  و الذي قبله بمواصفاته الآتية׃</span></p>
				
				<h3 style="text-align:center"><u><strong>التعييـــــــــــن</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.4">
						<span class="custom-tag">_#_templateInputText.4_#_</span>
					</div>
				</p>
				
				<h3 style="text-align:center"><u><strong>أصل الملكيــة</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.5">
						<span class="custom-tag">_#_templateInputText.5_#_</span>
					</div>
				</p>
				
				<h3 style="text-align:center"><u><strong>مــدة الإيــجار</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.6">
						<span class="custom-tag">_#_templateInputText.6_#_</span>
					</div>
				</p>
				
				<h3 style="text-align:center"><u><strong>مــقابل الإيـــجار</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.7">
						<span class="custom-tag">_#_templateInputText.7_#_</span>
					</div>
				</p>
				
				<h3 style="text-align:center"><u><strong>التأميــــــــــن</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.8">
						<span class="custom-tag">_#_templateInputText.8_#_</span>
					</div>
				</p>
				
				<h3 style="text-align:center"><u><strong>شروط و التزامات الطرف المؤجر</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">يتقيد الطرف المؤجر بالشروط الأساسية و يلتزم بما يلي׃</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- تسليم العقار للطرف المستأجر في حالة قابلة للاستعمال السكني، و بالخصوص ما تعلق بالتجهيزات الكهرباء و الغاز و الماء.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- ضمان الانتفاع المريح للطرف المستأجر و تطمينه من كل أشكال العيوب المخفية  أو النقائص التي تعيق الاستعمال الأفضل و التي لم ينتبه لها الطرف المستأجر أثناء إبرام عقد الإيجار.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- المحافظة على العقار في حالة خدمة الغرض السكني المتفق عليه في هذا العقد و القيام بما يلي׃</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- تحمل حصته من المساهمات التي تتطلبها الصيانة، وتصليح التجهيزات إﺫا تسبب مباشرة في حدوث تعطيلات لها.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- تحمل المصاريف المتأخرة لاستهلاك الكهرباء و الغاز و الماء  و كذلك مصاريف أخرى سابقة عن إمضاء هذا العقد.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- إبرام عقد تأمين على العقار خلال فترة الإيجار ضد الخطر الإيجاري و حرائق التجهيزات الضرورية للمحل المؤجر.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- تحمل أعباء الضرائب العقارية و الرسوم المتعلقة بالملكية المؤجرة.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- تسليم مفاتيح العقار إلى الطرف المستأجر بمجرد الإمضاء على العقد.</span></p>
				
				<h3 style="text-align:center"><u><strong>التزامات الطرف المستـأجر</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">يتقيد الطرف المستأجر بالشروط الأساسية التالية׃</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- مواجهة تدهور و ضياع التجهيزات الموضوعة تحت تصرفه من قبل الطرف المؤجر و التي تحدث خلال فترة العقد حيت تنتفع منها حصريا إلا إذا أثبت أنها وقعت نتيجة قوة قاهرة أو نتيجة خطأ الطرف المؤجر أو بفعل طرف ثالث لم يستقدمه الطرف المستأجر.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- إخطار الطرف المؤجر فـي الحال عن كل ضرر أو تدهور يطرأ في الأمكنة المستأجرة حتى و لو لم تحدث أي نتيجة ظاهرية.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- إرجاع مفاتيح العقار إلى الطرف المؤجر بمجرد مغادرة الطرف المستأجر.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- دفع المقابل و الأعباء المترتبة على فترة الإيجار طبقا لبنود العقد.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- الاستعمال العقلاني للعقار و التجهيزات محل الإيجار وفقا للمبتغى الذي حدده عقد الإيجار و المقتصر على طابعه السكني دون سواه.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- تحمل المصاريف الصغيرة سنويا إلا إذا حدثت نتيجة نقائص البناء أو نتيجة حادث فجائي أو قوة قاهرة.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- إمكانية التأمين ضد المخاطر المحتملة و التي يجب مواجهتها خلال كل مراحل الاستئجار.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- لا يمكن إجراء تغييرات أو تحويرات أخرى دون موافقة الطرف المؤجر الصريحة و المكتوبة، كل ترتيب يقوم به الطرف المستأجر بهذا الترخيص و كل تجميل أو تحسين يطرأ خلال فترة الإيجار يتحمل أعباءه الطرف المستأجر.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- إعادة العقار للطرف المؤجر في نفس الحالة التي استلم عليها، و لهذا فانه يمكن إجراء معاينة اعتراضية يتم إعدادها في البداية أثناء تسليم المفاتيح للطرف المستأجر و أثناء استعادة الطرف المؤجر لها في نهاية العقد.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- يتحمل الطرف المستأجر أعباء الصيانة و التنظيف  ومصاريف إستهلاكه للماء و الكهرباء و الغاز و الأنترنيت.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- يلجأ الطرفان المتعاقدان إلى الأحكام القانونية الشرعية في حالة بروز طارئ لم يتناوله العقد و هي تطبق بشأن مقابل الإيجار و الاستعمالات المحلية طبقا للقانون المدني.</span></p>
				
				<h3 style="text-align:center"><u><strong>بنـــود فاسخـــة</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">يخضع هذا العقد للفسخ بقوة القانون دون حاجة إلى اللجوء إلى الأشكال القضائية في مثل هذه الحالات׃</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- عدم دفع بدل الإيجار في المواعيد المحددة.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- عدم وفاء المؤجر بالالتزامات المنوطة به.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- عدم وفاء الطرف المستأجر بالالتزامات الملقاة على عاتقه.</span></p>
				
				<h3 style="text-align:center"><u><strong>حـــل النزاعـــات</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- من أجل فض أي نزاع ناتج عن هذا العقد فإن الطرفين مطالبان بالتوصل لحل خلافهما بالتراضي.-</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- في الحالة المعاكسة فان الطرفين يلجآن إلى المحكمة الواقعة في دائرة الاختصاص التي يقع بها العقار.</span></p>
				
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
				id: 9,
				TemplateId: 4,
				EntityId: 1,
				name: 'المؤجر',
			},
			{
				id: 10,
				TemplateId: 4,
				EntityId: 2,
				name: 'المستأجر',
			},
		]);

		await queryInterface.bulkInsert('TemplateInputTexts', [
			{
				id: 30,
				TemplateId: 4,
				TemplateEntityId: 9,
				name: 'المؤجر',
			},
			{
				id: 31,
				TemplateId: 4,
				TemplateEntityId: 10,
				name: 'المستأجر',
			},
			{
				id: 4,
				TemplateId: 4,
				name: 'التعيين',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				شقة سكنية تابعة لعمارة ذات ملكية مشتركة ، كائنة ب: ،بلدية ___ ، ولاية ___، تقع بالطابق ___ ، تتكون من من ___ غرف ، مطبخ حمام ، مرحاض وملحقات ....
				</span>
      </p>`,
			},
			{
				id: 5,
				TemplateId: 4,
				name: 'أصل الملكيـة',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				تملكت السيد(ة): الطرف المؤجر العقار المذكور أعلاه عن طريق عقد بيع محرر لدى الأستاذ: موثق ب ___ ، ولاية الجزائر، بتاريخ ___
				</span>
      </p>`,
			},
			{
				id: 6,
				TemplateId: 4,
				name: 'مدة الإيجار',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				اتفق الطرفان على تحديد مدة العقد ب: ___ أشهر يبدأ سريان مفعولها ابتداء من ___ مغلقة.
				</span>
      </p>`,
			},
			{
				id: 7,
				TemplateId: 4,
				name: 'مقابل الإيجار',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				إن مقابل الإيجار كان محل اتفاق و قبول بين الطرفين المتعاقدين و يشمل المسكن بمواصفاته المذكورة سالفا، و قد حدد بثمن قدره ___ دينار جزائري شهريا أي ___ دينار جزائري للمدة المحددة أعلاه.
				</span>
      </p>
			<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				و قد صرح الطرف المؤجر أنه سيستلم بدل الإيجار بتاريخ ___.
				</span>
      </p>`,
			},
			{
				id: 8,
				TemplateId: 4,
				name: 'التأمين',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				تم التأمين على العقار موضوع هذا العقد ضد الكوارث الطبيعية المحتمل حدوثها و هذا بموجب وثيقة التأمين  لدى "___ للتأمينات" رقم: ___ المؤرخة في ___.
				</span>
      </p>`,
			},
		]);

		// Commercial rent
		await queryInterface.bulkInsert('Templates', [
			{
				id: 5,
				CategoryId: 5,
				isPublished: true,
				content: `<h1 style="text-align:center">الجمهورية الجزائرية الديمقراطية الشعبية</h1>
				<p style="text-align:right"><span style="font-size:14pt">مكتب التوثيق</span></p>
				<p style="text-align:right"><strong>الأستاذ: <span class="custom-tag">_#_office.name_#_</span></strong></p>
				<p style="text-align:right"><strong>الفهرس: <span class="custom-tag">_#_document.reference_#_</span></strong></p>
				<p style="text-align:right"><strong>التاريـخ: <span class="custom-tag">_#_document.date_#_</span></strong></p>
				<h1 style="text-align:center"><span style="font-size:48px"><strong>عقد إيجار تجاري</strong></span></h1>
				<p>&nbsp;</p>
				<p style="text-align:right" class="dashed-ending">
					<span style="font-family:NotoNaskhArabic;">
						أمام الأستاذ: <span class="custom-tag">_#_office.name_#_</span>  موثق ب<span class="custom-tag">_#_office.address_#_</span>
					</span>
				</p>
				<h1 style="text-align:center"><span style="font-size:20px"><u><strong>حضـــــــــر(ت)</strong></u></span></h1>
				
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.32">
						<span class="custom-tag">_#_templateInputText.32_#_</span>
					</div>
				</p>
				<h3>الطرف الأول</h3>
				<h3 style="text-align:right">بصفته مؤجر</h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.33">
						<span class="custom-tag">_#_templateInputText.33_#_</span>
					</div>
				</p>
				<h3>الطرف الثاني</h3>
				<h3 style="text-align:right">بصفته مستأجر</h3>
				
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">وقد صرح الطرفان  برغبتهما في إبرام عقد إيجار كما يأتي ذكره فيما يلي׃</span></p>
				
				<h3 style="text-align:center"><u><strong>الهدف</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">يؤجر الطرف الأول العقار المعين أدناه إلى الطرف الثاني لغرض تجاري لإستعماله كمقر ثانوي للشركة و الذي قبله بمواصفاته التالية׃</span></p>
				
				<h3 style="text-align:center"><u><strong>التعييـــــــــــن</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.9">
						<span class="custom-tag">_#_templateInputText.9_#_</span>
					</div>
				</p>
				
				<h3 style="text-align:center"><u><strong>أصل الملكيــة</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.10">
						<span class="custom-tag">_#_templateInputText.10_#_</span>
					</div>
				</p>
				
				<h3 style="text-align:center"><u><strong>مــدة الإيــجار</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.11">
						<span class="custom-tag">_#_templateInputText.11_#_</span>
					</div>
				</p>
				
				<h3 style="text-align:center"><u><strong>مــقابل الإيـــجار</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.12">
						<span class="custom-tag">_#_templateInputText.12_#_</span>
					</div>
				</p>
				
				<h3 style="text-align:center"><u><strong>التأميــــــــــن</strong></u></h3>
				<p style="text-align:right">
					<div class="custom-section" data-tag="templateInputText.13">
						<span class="custom-tag">_#_templateInputText.13_#_</span>
					</div>
				</p>
				
				<h3 style="text-align:center"><u><strong>شروط و التزامات الطرف المؤجر</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">يتقيد الطرف المؤجر بالشروط الأساسية و يلتزم بما يلي׃</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- تسليم العقار للطرف المستأجر في حالة قابلة للاستعمال السكني، و بالخصوص ما تعلق بالتجهيزات الكهرباء و الغاز و الماء.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- ضمان الانتفاع المريح للطرف المستأجر و تطمينه من كل أشكال العيوب المخفية  أو النقائص التي تعيق الاستعمال الأفضل و التي لم ينتبه لها الطرف المستأجر أثناء إبرام عقد الإيجار.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- المحافظة على العقار في حالة خدمة الغرض السكني المتفق عليه في هذا العقد و القيام بما يلي׃</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- تحمل حصته من المساهمات التي تتطلبها الصيانة، وتصليح التجهيزات إﺫا تسبب مباشرة في حدوث تعطيلات لها.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- تحمل المصاريف المتأخرة لاستهلاك الكهرباء و الغاز و الماء  و كذلك مصاريف أخرى سابقة عن إمضاء هذا العقد.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- إبرام عقد تأمين على العقار خلال فترة الإيجار ضد الخطر الإيجاري و حرائق التجهيزات الضرورية للمحل المؤجر.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- تحمل أعباء الضرائب العقارية و الرسوم المتعلقة بالملكية المؤجرة.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- تسليم مفاتيح العقار إلى الطرف المستأجر بمجرد الإمضاء على العقد.</span></p>
				
				<h3 style="text-align:center"><u><strong>التزامات الطرف المستـأجر</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">يتقيد الطرف المستأجر بالشروط الأساسية التالية׃</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- مواجهة تدهور و ضياع التجهيزات الموضوعة تحت تصرفه من قبل الطرف المؤجر و التي تحدث خلال فترة العقد حيت تنتفع منها حصريا إلا إذا أثبت أنها وقعت نتيجة قوة قاهرة أو نتيجة خطأ الطرف المؤجر أو بفعل طرف ثالث لم يستقدمه الطرف المستأجر.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- إخطار الطرف المؤجر فـي الحال عن كل ضرر أو تدهور يطرأ في الأمكنة المستأجرة حتى و لو لم تحدث أي نتيجة ظاهرية.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- إرجاع مفاتيح العقار إلى الطرف المؤجر بمجرد مغادرة الطرف المستأجر.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- دفع المقابل و الأعباء المترتبة على فترة الإيجار طبقا لبنود العقد.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- الاستعمال العقلاني للعقار و التجهيزات محل الإيجار وفقا للمبتغى الذي حدده عقد الإيجار و المقتصر على طابعه التجاري دون سواه.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- تحمل المصاريف الصغيرة سنويا إلا إذا حدثت نتيجة نقائص البناء أو نتيجة حادث فجائي أو قوة قاهرة.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- إمكانية التأمين ضد المخاطر المحتملة و التي يجب مواجهتها خلال كل مراحل الاستئجار.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- لا يمكن إجراء تغييرات أو تحويرات أخرى دون موافقة الطرف المؤجر الصريحة و المكتوبة، كل ترتيب يقوم به الطرف المستأجر بهذا الترخيص و كل تجميل أو تحسين يطرأ خلال فترة الإيجار يتحمل أعباءه الطرف المستأجر.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- إعادة العقار للطرف المؤجر في نفس الحالة التي استلم عليها، و لهذا فانه يمكن إجراء معاينة اعتراضية يتم إعدادها في البداية أثناء تسليم المفاتيح للطرف المستأجر و أثناء استعادة الطرف المؤجر لها في نهاية العقد.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- يتحمل الطرف المستأجر أعباء الصيانة و التنظيف  ومصاريف إستهلاكه للماء و الكهرباء و الغاز و الأنترنيت.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- يلجأ الطرفان المتعاقدان إلى الأحكام القانونية الشرعية في حالة بروز طارئ لم يتناوله العقد و هي تطبق بشأن مقابل الإيجار و الاستعمالات المحلية طبقا للقانون المدني.</span></p>
				
				<h3 style="text-align:center"><u><strong>بنـــود فاسخـــة</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">يخضع هذا العقد للفسخ بقوة القانون دون حاجة إلى اللجوء إلى الأشكال القضائية في مثل هذه الحالات׃</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- عدم دفع بدل الإيجار في المواعيد المحددة.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- عدم وفاء المؤجر بالالتزامات المنوطة به.</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- عدم وفاء الطرف المستأجر بالالتزامات الملقاة على عاتقه.</span></p>
				
				<h3 style="text-align:center"><u><strong>حـــل النزاعـــات</strong></u></h3>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- من أجل فض أي نزاع ناتج عن هذا العقد فإن الطرفين مطالبان بالتوصل لحل خلافهما بالتراضي.-</span></p>
				<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic">- في الحالة المعاكسة فان الطرفين يلجآن إلى المحكمة الواقعة في دائرة الاختصاص التي يقع بها العقار.</span></p>
				
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
				id: 11,
				TemplateId: 5,
				EntityId: 2,
				name: 'المؤجر',
			},
			{
				id: 12,
				TemplateId: 5,
				EntityId: 1,
				name: 'المستأجر',
			},
		]);

		await queryInterface.bulkInsert('TemplateInputTexts', [
			{
				id: 32,
				TemplateId: 5,
				TemplateEntityId: 11,
				name: 'المؤجر',
			},
			{
				id: 33,
				TemplateId: 5,
				TemplateEntityId: 12,
				name: 'المستأجر',
			},
			{
				id: 9,
				TemplateId: 5,
				name: 'التعيين',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				محـل كائن ب: ___ يحمل رقم ___ ولاية ___، تقدر مساحته ب: ___ ...
				</span>
      </p>`,
			},
			{
				id: 10,
				TemplateId: 5,
				name: 'أصل الملكيـة',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				تملكت السيد(ة): الطرف المؤجر العقار المذكور أعلاه عن طريق عقد بيع محرر لدى الأستاذ: موثق ب ___ ، ولاية الجزائر، بتاريخ ___
				</span>
      </p>`,
			},
			{
				id: 11,
				TemplateId: 5,
				name: 'مدة الإيجار',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				اتفق الطرفان على تحديد مدة العقد ب: ___ أشهر يبدأ سريان مفعولها ابتداء من ___ مغلقة.
				</span>
      </p>`,
			},
			{
				id: 12,
				TemplateId: 5,
				name: 'مقابل الإيجار',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				إن مقابل الإيجار كان محل اتفاق و قبول بين الطرفين المتعاقدين و يشمل المسكن بمواصفاته المذكورة سالفا، و قد حدد بثمن قدره ___ دينار جزائري شهريا أي ___ دينار جزائري للمدة المحددة أعلاه.
				</span>
      </p>
			<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				و قد صرح الطرف المؤجر أنه سيستلم بدل الإيجار بتاريخ ___.
				</span>
      </p>`,
			},
			{
				id: 13,
				TemplateId: 5,
				name: 'التأمين',
				defaultValue: `<p style="text-align:right" class="dashed-ending">
        <span style="font-family:NotoNaskhArabic;">
				تم التأمين على العقار موضوع هذا العقد ضد الكوارث الطبيعية المحتمل حدوثها و هذا بموجب وثيقة التأمين  لدى "___ للتأمينات" رقم: ___ المؤرخة في ___.
				</span>
      </p>`,
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {},
};
