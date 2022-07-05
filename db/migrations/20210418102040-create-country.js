'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Countries', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT.UNSIGNED,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			nationality: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW'),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW'),
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE,
			},
		});

		await queryInterface.bulkInsert('Countries', [
			{
				name: 'أفغانستان',
				nationality: 'أفغانية',
			},
			{
				name: 'ألبانيا',
				nationality: 'ألبانية',
			},
			{
				name: 'جزر آلاند',
				nationality: 'آلاندية',
			},
			{
				name: 'الجزائر',
				nationality: 'جزائرية',
			},
			{
				name: 'ساموا-الأمريكي',
				nationality: 'أمريكية ساموانية',
			},
			{
				name: 'أندورا',
				nationality: 'أندورية',
			},
			{
				name: 'أنغولا',
				nationality: 'أنقولية',
			},
			{
				name: 'أنغويلا',
				nationality: 'أنغويلية',
			},
			{
				name: 'أنتاركتيكا',
				nationality: 'أنتاركتيكية',
			},
			{
				name: 'أنتيغوا وبربودا',
				nationality: 'بربودية',
			},
			{
				name: 'الأرجنتين',
				nationality: 'أرجنتينية',
			},
			{
				name: 'أرمينيا',
				nationality: 'أرمينية',
			},
			{
				name: 'أروبه',
				nationality: 'أوروبهينية',
			},
			{
				name: 'أستراليا',
				nationality: 'أسترالية',
			},
			{
				name: 'النمسا',
				nationality: 'نمساوية',
			},
			{
				name: 'أذربيجان',
				nationality: 'أذربيجانية',
			},
			{
				name: 'الباهاماس',
				nationality: 'باهاميسية',
			},
			{
				name: 'البحرين',
				nationality: 'بحرينية',
			},
			{
				name: 'بنغلاديش',
				nationality: 'بنغلاديشية',
			},
			{
				name: 'بربادوس',
				nationality: 'بربادوسية',
			},
			{
				name: 'روسيا البيضاء',
				nationality: 'روسية',
			},
			{
				name: 'بلجيكا',
				nationality: 'بلجيكية',
			},
			{
				name: 'بيليز',
				nationality: 'بيليزية',
			},
			{
				name: 'بنين',
				nationality: 'بنينية',
			},
			{
				name: 'سان بارتيلمي',
				nationality: 'سان بارتيلمية',
			},
			{
				name: 'جزر برمودا',
				nationality: 'برمودية',
			},
			{
				name: 'بوتان',
				nationality: 'بوتانية',
			},
			{
				name: 'بوليفيا',
				nationality: 'بوليفية',
			},
			{
				name: 'البوسنة و الهرسك',
				nationality: 'بوسنية/هرسكية',
			},
			{
				name: 'بوتسوانا',
				nationality: 'بوتسوانية',
			},
			{
				name: 'جزيرة بوفيه',
				nationality: 'بوفيهية',
			},
			{
				name: 'البرازيل',
				nationality: 'برازيلية',
			},
			{
				name: 'إقليم المحيط الهندي البريطاني',
				nationality: 'إقليم المحيط الهندي البريطانية',
			},
			{
				name: 'بروني',
				nationality: 'برونية',
			},
			{
				name: 'بلغاريا',
				nationality: 'بلغارية',
			},
			{
				name: 'بوركينا فاسو',
				nationality: 'بوركينية',
			},
			{
				name: 'بوروندي',
				nationality: 'بورونيدية',
			},
			{
				name: 'كمبوديا',
				nationality: 'كمبودية',
			},
			{
				name: 'كاميرون',
				nationality: 'كاميرونية',
			},
			{
				name: 'كندا',
				nationality: 'كندية',
			},
			{
				name: 'الرأس الأخضر',
				nationality: 'الرأس الأخضر',
			},
			{
				name: 'جزر كايمان',
				nationality: 'كايمانية',
			},
			{
				name: 'جمهورية أفريقيا الوسطى',
				nationality: 'أفريقية',
			},
			{
				name: 'تشاد',
				nationality: 'تشادية',
			},
			{
				name: 'شيلي',
				nationality: 'شيلية',
			},
			{
				name: 'الصين',
				nationality: 'صينية',
			},
			{
				name: 'جزيرة عيد الميلاد',
				nationality: 'جزيرة عيد الميلاد',
			},
			{
				name: 'جزر كوكوس',
				nationality: 'جزر كوكوس',
			},
			{
				name: 'كولومبيا',
				nationality: 'كولومبية',
			},
			{
				name: 'جزر القمر',
				nationality: 'جزر القمر',
			},
			{
				name: 'الكونغو',
				nationality: 'كونغولية',
			},
			{
				name: 'جزر كوك',
				nationality: 'جزر كوك',
			},
			{
				name: 'كوستاريكا',
				nationality: 'كوستاريكية',
			},
			{
				name: 'كرواتيا',
				nationality: 'كوراتية',
			},
			{
				name: 'كوبا',
				nationality: 'كوبية',
			},
			{
				name: 'قبرص',
				nationality: 'قبرصية',
			},
			{
				name: 'كوراساو',
				nationality: 'كوراساوية',
			},
			{
				name: 'الجمهورية التشيكية',
				nationality: 'تشيكية',
			},
			{
				name: 'الدانمارك',
				nationality: 'دنماركية',
			},
			{
				name: 'جيبوتي',
				nationality: 'جيبوتية',
			},
			{
				name: 'دومينيكا',
				nationality: 'دومينيكية',
			},
			{
				name: 'الجمهورية الدومينيكية',
				nationality: 'دومينيكية',
			},
			{
				name: 'إكوادور',
				nationality: 'إكوادورية',
			},
			{
				name: 'مصر',
				nationality: 'مصرية',
			},
			{
				name: 'إلسلفادور',
				nationality: 'سلفادورية',
			},
			{
				name: 'غينيا الاستوائي',
				nationality: 'غينية',
			},
			{
				name: 'إريتريا',
				nationality: 'إريتيرية',
			},
			{
				name: 'استونيا',
				nationality: 'استونية',
			},
			{
				name: 'أثيوبيا',
				nationality: 'أثيوبية',
			},
			{
				name: 'جزر فوكلاند',
				nationality: 'فوكلاندية',
			},
			{
				name: 'جزر فارو',
				nationality: 'جزر فارو',
			},
			{
				name: 'فيجي',
				nationality: 'فيجية',
			},
			{
				name: 'فنلندا',
				nationality: 'فنلندية',
			},
			{
				name: 'فرنسا',
				nationality: 'فرنسية',
			},
			{
				name: 'غويانا الفرنسية',
				nationality: 'غويانا الفرنسية',
			},
			{
				name: 'بولينيزيا الفرنسية',
				nationality: 'بولينيزيية',
			},
			{
				name: 'أراض فرنسية جنوبية وأنتارتيكية',
				nationality: 'أراض فرنسية جنوبية وأنتارتيكية',
			},
			{
				name: 'الغابون',
				nationality: 'غابونية',
			},
			{
				name: 'غامبيا',
				nationality: 'غامبية',
			},
			{
				name: 'جيورجيا',
				nationality: 'جيورجية',
			},
			{
				name: 'ألمانيا',
				nationality: 'ألمانية',
			},
			{
				name: 'غانا',
				nationality: 'غانية',
			},
			{
				name: 'جبل طارق',
				nationality: 'جبل طارق',
			},
			{
				name: 'غيرنزي',
				nationality: 'غيرنزية',
			},
			{
				name: 'اليونان',
				nationality: 'يونانية',
			},
			{
				name: 'جرينلاند',
				nationality: 'جرينلاندية',
			},
			{
				name: 'غرينادا',
				nationality: 'غرينادية',
			},
			{
				name: 'جزر جوادلوب',
				nationality: 'جزر جوادلوب',
			},
			{
				name: 'جوام',
				nationality: 'جوامية',
			},
			{
				name: 'غواتيمال',
				nationality: 'غواتيمالية',
			},
			{
				name: 'غينيا',
				nationality: 'غينية',
			},
			{
				name: 'غينيا-بيساو',
				nationality: 'غينية',
			},
			{
				name: 'غيانا',
				nationality: 'غيانية',
			},
			{
				name: 'هايتي',
				nationality: 'هايتية',
			},
			{
				name: 'جزيرة هيرد وجزر ماكدونالد',
				nationality: 'جزيرة هيرد وجزر ماكدونالد',
			},
			{
				name: 'هندوراس',
				nationality: 'هندوراسية',
			},
			{
				name: 'هونغ كونغ',
				nationality: 'هونغ كونغية',
			},
			{
				name: 'المجر',
				nationality: 'مجرية',
			},
			{
				name: 'آيسلندا',
				nationality: 'آيسلندية',
			},
			{
				name: 'الهند',
				nationality: 'هندية',
			},
			{
				name: 'جزيرة مان',
				nationality: 'مانية',
			},
			{
				name: 'أندونيسيا',
				nationality: 'أندونيسيية',
			},
			{
				name: 'إيران',
				nationality: 'إيرانية',
			},
			{
				name: 'العراق',
				nationality: 'عراقية',
			},
			{
				name: 'إيرلندا',
				nationality: 'إيرلندية',
			},
			{
				name: 'إسرائيل',
				nationality: 'إسرائيلية',
			},
			{
				name: 'إيطاليا',
				nationality: 'إيطالية',
			},
			{
				name: 'ساحل العاج',
				nationality: 'ساحل العاج',
			},
			{
				name: 'جيرزي',
				nationality: 'جيرزية',
			},
			{
				name: 'جمايكا',
				nationality: 'جمايكية',
			},
			{
				name: 'اليابان',
				nationality: 'يابانية',
			},
			{
				name: 'الأردن',
				nationality: 'أردنية',
			},
			{
				name: 'كازاخستان',
				nationality: 'كازاخستانية',
			},
			{
				name: 'كينيا',
				nationality: 'كينية',
			},
			{
				name: 'كيريباتي',
				nationality: 'كيريباتية',
			},
			{
				name: 'كوريا الشمالية',
				nationality: 'كورية',
			},
			{
				name: 'كوريا الجنوبية',
				nationality: 'كورية',
			},
			{
				name: 'كوسوفو',
				nationality: 'كوسيفية',
			},
			{
				name: 'الكويت',
				nationality: 'كويتية',
			},
			{
				name: 'قيرغيزستان',
				nationality: 'قيرغيزستانية',
			},
			{
				name: 'لاوس',
				nationality: 'لاوسية',
			},
			{
				name: 'لاتفيا',
				nationality: 'لاتيفية',
			},
			{
				name: 'لبنان',
				nationality: 'لبنانية',
			},
			{
				name: 'ليسوتو',
				nationality: 'ليوسيتية',
			},
			{
				name: 'ليبيريا',
				nationality: 'ليبيرية',
			},
			{
				name: 'ليبيا',
				nationality: 'ليبية',
			},
			{
				name: 'ليختنشتين',
				nationality: 'ليختنشتينية',
			},
			{
				name: 'لتوانيا',
				nationality: 'لتوانيية',
			},
			{
				name: 'لوكسمبورغ',
				nationality: 'لوكسمبورغية',
			},
			{
				name: 'سريلانكا',
				nationality: 'سريلانكية',
			},
			{
				name: 'ماكاو',
				nationality: 'ماكاوية',
			},
			{
				name: 'مقدونيا',
				nationality: 'مقدونية',
			},
			{
				name: 'مدغشقر',
				nationality: 'مدغشقرية',
			},
			{
				name: 'مالاوي',
				nationality: 'مالاوية',
			},
			{
				name: 'ماليزيا',
				nationality: 'ماليزية',
			},
			{
				name: 'المالديف',
				nationality: 'مالديفية',
			},
			{
				name: 'مالي',
				nationality: 'مالية',
			},
			{
				name: 'مالطا',
				nationality: 'مالطية',
			},
			{
				name: 'جزر مارشال',
				nationality: 'مارشالية',
			},
			{
				name: 'مارتينيك',
				nationality: 'مارتينيكية',
			},
			{
				name: 'موريتانيا',
				nationality: 'موريتانيية',
			},
			{
				name: 'موريشيوس',
				nationality: 'موريشيوسية',
			},
			{
				name: 'مايوت',
				nationality: 'مايوتية',
			},
			{
				name: 'المكسيك',
				nationality: 'مكسيكية',
			},
			{
				name: 'مايكرونيزيا',
				nationality: 'مايكرونيزيية',
			},
			{
				name: 'مولدافيا',
				nationality: 'مولديفية',
			},
			{
				name: 'موناكو',
				nationality: 'مونيكية',
			},
			{
				name: 'منغوليا',
				nationality: 'منغولية',
			},
			{
				name: 'الجبل الأسود',
				nationality: 'الجبل الأسود',
			},
			{
				name: 'مونتسيرات',
				nationality: 'مونتسيراتية',
			},
			{
				name: 'المغرب',
				nationality: 'مغربية',
			},
			{
				name: 'موزمبيق',
				nationality: 'موزمبيقية',
			},
			{
				name: 'ميانمار',
				nationality: 'ميانمارية',
			},
			{
				name: 'ناميبيا',
				nationality: 'ناميبية',
			},
			{
				name: 'نورو',
				nationality: 'نورية',
			},
			{
				name: 'نيبال',
				nationality: 'نيبالية',
			},
			{
				name: 'هولندا',
				nationality: 'هولندية',
			},
			{
				name: 'جزر الأنتيل الهولندي',
				nationality: 'هولندية',
			},
			{
				name: 'كاليدونيا الجديدة',
				nationality: 'كاليدونية',
			},
			{
				name: 'نيوزيلندا',
				nationality: 'نيوزيلندية',
			},
			{
				name: 'نيكاراجوا',
				nationality: 'نيكاراجوية',
			},
			{
				name: 'النيجر',
				nationality: 'نيجيرية',
			},
			{
				name: 'نيجيريا',
				nationality: 'نيجيرية',
			},
			{
				name: 'ني',
				nationality: 'نية',
			},
			{
				name: 'جزيرة نورفولك',
				nationality: 'نورفوليكية',
			},
			{
				name: 'جزر ماريانا الشمالية',
				nationality: 'مارينية',
			},
			{
				name: 'النرويج',
				nationality: 'نرويجية',
			},
			{
				name: 'عمان',
				nationality: 'عمانية',
			},
			{
				name: 'باكستان',
				nationality: 'باكستانية',
			},
			{
				name: 'بالاو',
				nationality: 'بالاوية',
			},
			{
				name: 'فلسطين',
				nationality: 'فلسطينية',
			},
			{
				name: 'بنما',
				nationality: 'بنمية',
			},
			{
				name: 'بابوا غينيا الجديدة',
				nationality: 'بابوية',
			},
			{
				name: 'باراغواي',
				nationality: 'بارغاوية',
			},
			{
				name: 'بيرو',
				nationality: 'بيرية',
			},
			{
				name: 'الفليبين',
				nationality: 'فلبينية',
			},
			{
				name: 'بيتكيرن',
				nationality: 'بيتكيرنية',
			},
			{
				name: 'بولونيا',
				nationality: 'بولينية',
			},
			{
				name: 'البرتغال',
				nationality: 'برتغالية',
			},
			{
				name: 'بورتو ريكو',
				nationality: 'بورتية',
			},
			{
				name: 'قطر',
				nationality: 'قطرية',
			},
			{
				name: 'ريونيون',
				nationality: 'ريونيونية',
			},
			{
				name: 'رومانيا',
				nationality: 'رومانية',
			},
			{
				name: 'روسيا',
				nationality: 'روسية',
			},
			{
				name: 'رواندا',
				nationality: 'رواندا',
			},
			{
				name: 'سانت كيتس ونيفس,',
				nationality: 'سانت كيتس ونيفس',
			},
			{
				name: 'ساينت مارتن فرنسي',
				nationality: 'ساينت مارتني فرنسية',
			},
			{
				name: 'ساينت مارتن هولندي',
				nationality: 'ساينت مارتني هولندية',
			},
			{
				name: 'سان بيير وميكلون',
				nationality: 'سان بيير وميكلونية',
			},
			{
				name: 'سانت فنسنت وجزر غرينادين',
				nationality: 'سانت فنسنت وجزر غرينادين',
			},
			{
				name: 'ساموا',
				nationality: 'ساموية',
			},
			{
				name: 'سان مارينو',
				nationality: 'مارينية',
			},
			{
				name: 'ساو تومي وبرينسيبي',
				nationality: 'ساو تومي وبرينسيبية',
			},
			{
				name: 'المملكة العربية السعودية',
				nationality: 'سعودية',
			},
			{
				name: 'السنغال',
				nationality: 'سنغالية',
			},
			{
				name: 'صربيا',
				nationality: 'صربية',
			},
			{
				name: 'سيشيل',
				nationality: 'سيشيلية',
			},
			{
				name: 'سيراليون',
				nationality: 'سيراليونية',
			},
			{
				name: 'سنغافورة',
				nationality: 'سنغافورية',
			},
			{
				name: 'سلوفاكيا',
				nationality: 'سولفاكية',
			},
			{
				name: 'سلوفينيا',
				nationality: 'سولفينية',
			},
			{
				name: 'جزر سليمان',
				nationality: 'جزر سليمان',
			},
			{
				name: 'الصومال',
				nationality: 'صومالية',
			},
			{
				name: 'جنوب أفريقيا',
				nationality: 'أفريقية',
			},
			{
				name: 'المنطقة القطبية الجنوبية',
				nationality: 'لمنطقة القطبية الجنوبية',
			},
			{
				name: 'السودان الجنوبي',
				nationality: 'سوادني جنوبية',
			},
			{
				name: 'إسبانيا',
				nationality: 'إسبانية',
			},
			{
				name: 'سانت هيلانة',
				nationality: 'هيلانية',
			},
			{
				name: 'السودان',
				nationality: 'سودانية',
			},
			{
				name: 'سورينام',
				nationality: 'سورينامية',
			},
			{
				name: 'سفالبارد ويان ماين',
				nationality: 'سفالبارد ويان ماين',
			},
			{
				name: 'سوازيلند',
				nationality: 'سوازيلندية',
			},
			{
				name: 'السويد',
				nationality: 'سويدية',
			},
			{
				name: 'سويسرا',
				nationality: 'سويسرية',
			},
			{
				name: 'سوريا',
				nationality: 'سورية',
			},
			{
				name: 'تايوان',
				nationality: 'تايوانية',
			},
			{
				name: 'طاجيكستان',
				nationality: 'طاجيكستانية',
			},
			{
				name: 'تنزانيا',
				nationality: 'تنزانيية',
			},
			{
				name: 'تايلندا',
				nationality: 'تايلندية',
			},
			{
				name: 'تيمور الشرقية',
				nationality: 'تيمورية',
			},
			{
				name: 'توغو',
				nationality: 'توغية',
			},
			{
				name: 'توكيلاو',
				nationality: 'توكيلاوية',
			},
			{
				name: 'تونغا',
				nationality: 'تونغية',
			},
			{
				name: 'ترينيداد وتوباغو',
				nationality: 'ترينيداد وتوباغو',
			},
			{
				name: 'تونس',
				nationality: 'تونسية',
			},
			{
				name: 'تركيا',
				nationality: 'تركية',
			},
			{
				name: 'تركمانستان',
				nationality: 'تركمانستانية',
			},
			{
				name: 'جزر توركس وكايكوس',
				nationality: 'جزر توركس وكايكوس',
			},
			{
				name: 'توفالو',
				nationality: 'توفالية',
			},
			{
				name: 'أوغندا',
				nationality: 'أوغندية',
			},
			{
				name: 'أوكرانيا',
				nationality: 'أوكرانية',
			},
			{
				name: 'الإمارات العربية المتحدة',
				nationality: 'إماراتية',
			},
			{
				name: 'المملكة المتحدة',
				nationality: 'بريطانية',
			},
			{
				name: 'الولايات المتحدة',
				nationality: 'أمريكية',
			},
			{
				name: 'قائمة الولايات والمناطق الأمريكية',
				nationality: 'أمريكية',
			},
			{
				name: 'أورغواي',
				nationality: 'أورغواية',
			},
			{
				name: 'أوزباكستان',
				nationality: 'أوزباكستانية',
			},
			{
				name: 'فانواتو',
				nationality: 'فانواتية',
			},
			{
				name: 'فنزويلا',
				nationality: 'فنزويلية',
			},
			{
				name: 'فيتنام',
				nationality: 'فيتنامية',
			},
			{
				name: 'الجزر العذراء الأمريكي',
				nationality: 'أمريكية',
			},
			{
				name: 'فنزويلا',
				nationality: 'فاتيكانية',
			},
			{
				name: 'والس وفوتونا',
				nationality: 'فوتونية',
			},
			{
				name: 'الصحراء الغربية',
				nationality: 'صحراوية',
			},
			{
				name: 'اليمن',
				nationality: 'يمنية',
			},
			{
				name: 'زامبيا',
				nationality: 'زامبيانية',
			},
			{
				name: 'زمبابوي',
				nationality: 'زمبابوية',
			},
		]);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Countries');
	},
};
