import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

async function seed() {
  const connection = await mysql.createConnection(DATABASE_URL);
  
  console.log('Seeding database...');

  // Seed Products
  const products = [
    {
      nameAr: 'مراوح الطرد المركزي',
      nameEn: 'Centrifugal Fans',
      descriptionAr: 'مراوح طرد مركزي عالية الكفاءة مصممة للتطبيقات الصناعية الثقيلة. توفر تدفق هواء قوي ومستقر مع مستويات ضوضاء منخفضة.',
      descriptionEn: 'High-efficiency centrifugal fans designed for heavy industrial applications. Provides strong and stable airflow with low noise levels.',
      category: 'industrial',
      specifications: JSON.stringify({
        "معدل التدفق": "1,000 - 50,000 م³/ساعة",
        "الضغط": "حتى 3,000 باسكال",
        "درجة الحرارة": "-20 إلى +400 درجة مئوية",
        "المواد": "فولاذ كربوني / ستانلس ستيل"
      }),
      sortOrder: 1
    },
    {
      nameAr: 'مراوح محورية صناعية',
      nameEn: 'Industrial Axial Fans',
      descriptionAr: 'مراوح محورية قوية للتهوية العامة والتبريد. مثالية للمستودعات والمصانع الكبيرة.',
      descriptionEn: 'Powerful axial fans for general ventilation and cooling. Ideal for large warehouses and factories.',
      category: 'industrial',
      specifications: JSON.stringify({
        "معدل التدفق": "5,000 - 200,000 م³/ساعة",
        "الضغط": "حتى 1,500 باسكال",
        "القطر": "400 - 2,000 مم",
        "الكفاءة": "حتى 85%"
      }),
      sortOrder: 2
    },
    {
      nameAr: 'وحدات معالجة الهواء',
      nameEn: 'Air Handling Units',
      descriptionAr: 'وحدات معالجة هواء متكاملة للتحكم في جودة الهواء ودرجة الحرارة والرطوبة في المباني الكبيرة.',
      descriptionEn: 'Integrated air handling units for controlling air quality, temperature and humidity in large buildings.',
      category: 'hvac',
      specifications: JSON.stringify({
        "السعة": "1,000 - 100,000 م³/ساعة",
        "التبريد": "حتى 500 كيلوواط",
        "التدفئة": "حتى 300 كيلوواط",
        "الترشيح": "G4 - H14"
      }),
      sortOrder: 3
    },
    {
      nameAr: 'مراوح السقف',
      nameEn: 'Roof Fans',
      descriptionAr: 'مراوح سقف مقاومة للعوامل الجوية للتهوية الطبيعية والميكانيكية للمباني الصناعية والتجارية.',
      descriptionEn: 'Weather-resistant roof fans for natural and mechanical ventilation of industrial and commercial buildings.',
      category: 'commercial',
      specifications: JSON.stringify({
        "معدل التدفق": "500 - 30,000 م³/ساعة",
        "الحماية": "IP55",
        "المواد": "ألومنيوم مطلي",
        "الضمان": "5 سنوات"
      }),
      sortOrder: 4
    },
    {
      nameAr: 'أنظمة شفط الدخان',
      nameEn: 'Smoke Extraction Systems',
      descriptionAr: 'أنظمة شفط دخان متقدمة للسلامة من الحرائق، معتمدة وفق المعايير الدولية.',
      descriptionEn: 'Advanced smoke extraction systems for fire safety, certified according to international standards.',
      category: 'safety',
      specifications: JSON.stringify({
        "درجة الحرارة": "حتى 400°C لمدة 2 ساعة",
        "الاعتماد": "EN 12101-3",
        "التحكم": "أوتوماتيكي / يدوي",
        "التكامل": "مع أنظمة إنذار الحريق"
      }),
      sortOrder: 5
    },
    {
      nameAr: 'فلاتر الهواء الصناعية',
      nameEn: 'Industrial Air Filters',
      descriptionAr: 'فلاتر هواء عالية الكفاءة لتنقية الهواء من الجسيمات والملوثات في البيئات الصناعية.',
      descriptionEn: 'High-efficiency air filters for purifying air from particles and pollutants in industrial environments.',
      category: 'filtration',
      specifications: JSON.stringify({
        "الكفاءة": "85% - 99.995%",
        "الفئة": "G4 - U17",
        "الأبعاد": "مخصصة",
        "العمر الافتراضي": "6-24 شهر"
      }),
      sortOrder: 6
    }
  ];

  for (const product of products) {
    await connection.execute(
      `INSERT INTO products (nameAr, nameEn, descriptionAr, descriptionEn, category, specifications, sortOrder, isActive) 
       VALUES (?, ?, ?, ?, ?, ?, ?, true)`,
      [product.nameAr, product.nameEn, product.descriptionAr, product.descriptionEn, product.category, product.specifications, product.sortOrder]
    );
  }
  console.log('✓ Products seeded');

  // Seed Services
  const services = [
    {
      titleAr: 'التصميم والهندسة',
      titleEn: 'Design & Engineering',
      descriptionAr: 'نقدم خدمات تصميم هندسي متكاملة لأنظمة التهوية والتكييف، تشمل الدراسات الفنية والحسابات الهندسية والرسومات التنفيذية.',
      descriptionEn: 'We provide integrated engineering design services for ventilation and air conditioning systems.',
      icon: 'Settings',
      features: JSON.stringify(["دراسات جدوى فنية", "حسابات الأحمال الحرارية", "تصميم شبكات التوزيع", "رسومات تنفيذية معتمدة", "محاكاة CFD"]),
      sortOrder: 1
    },
    {
      titleAr: 'تصنيع المعدات',
      titleEn: 'Equipment Manufacturing',
      descriptionAr: 'نمتلك مصنعاً متكاملاً لتصنيع مراوح التهوية ووحدات معالجة الهواء وفق أعلى معايير الجودة العالمية.',
      descriptionEn: 'We own a fully integrated factory for manufacturing ventilation fans and air handling units.',
      icon: 'Fan',
      features: JSON.stringify(["مراوح طرد مركزي", "مراوح محورية", "وحدات معالجة الهواء", "مجاري الهواء", "ملحقات التهوية"]),
      sortOrder: 2
    },
    {
      titleAr: 'التركيب والتشغيل',
      titleEn: 'Installation & Commissioning',
      descriptionAr: 'فريق تركيب محترف يضمن تنفيذ المشاريع وفق الجدول الزمني المحدد وبأعلى معايير السلامة.',
      descriptionEn: 'Professional installation team ensures project execution according to schedule and highest safety standards.',
      icon: 'Wrench',
      features: JSON.stringify(["تركيب احترافي", "اختبارات الأداء", "موازنة الأنظمة", "تشغيل تجريبي", "تدريب المشغلين"]),
      sortOrder: 3
    },
    {
      titleAr: 'الصيانة الدورية',
      titleEn: 'Preventive Maintenance',
      descriptionAr: 'برامج صيانة دورية مخصصة للحفاظ على كفاءة أنظمة التهوية وإطالة عمرها الافتراضي.',
      descriptionEn: 'Customized preventive maintenance programs to maintain ventilation system efficiency.',
      icon: 'ClipboardCheck',
      features: JSON.stringify(["فحص دوري شامل", "تنظيف الفلاتر", "فحص المحركات", "معايرة الأنظمة", "تقارير دورية"]),
      sortOrder: 4
    },
    {
      titleAr: 'حلول كفاءة الطاقة',
      titleEn: 'Energy Efficiency Solutions',
      descriptionAr: 'نساعدك في تقليل استهلاك الطاقة وتحسين كفاءة أنظمة التهوية من خلال التقييم الشامل.',
      descriptionEn: 'We help you reduce energy consumption and improve ventilation system efficiency.',
      icon: 'Zap',
      features: JSON.stringify(["تدقيق الطاقة", "تحديث المحركات", "أنظمة التحكم الذكي", "استرداد الحرارة", "تقارير التوفير"]),
      sortOrder: 5
    },
    {
      titleAr: 'الدعم الفني',
      titleEn: 'Technical Support',
      descriptionAr: 'فريق دعم فني متخصص متاح على مدار الساعة للرد على استفساراتكم وحل المشكلات الطارئة.',
      descriptionEn: 'Specialized technical support team available 24/7 to answer your inquiries.',
      icon: 'HeadphonesIcon',
      features: JSON.stringify(["دعم 24/7", "استجابة سريعة", "فنيين متخصصين", "قطع غيار أصلية", "ضمان الخدمة"]),
      sortOrder: 6
    }
  ];

  for (const service of services) {
    await connection.execute(
      `INSERT INTO services (titleAr, titleEn, descriptionAr, descriptionEn, icon, features, sortOrder, isActive) 
       VALUES (?, ?, ?, ?, ?, ?, ?, true)`,
      [service.titleAr, service.titleEn, service.descriptionAr, service.descriptionEn, service.icon, service.features, service.sortOrder]
    );
  }
  console.log('✓ Services seeded');

  // Seed Projects
  const projects = [
    {
      titleAr: 'مصنع الألبان المتقدم',
      titleEn: 'Advanced Dairy Factory',
      descriptionAr: 'تصميم وتنفيذ نظام تهوية متكامل لمصنع ألبان بمساحة 50,000 متر مربع.',
      descriptionEn: 'Design and implementation of integrated ventilation system for 50,000 sqm dairy factory.',
      clientName: 'شركة الألبان السعودية',
      location: 'الرياض',
      category: 'industrial',
      isFeatured: true,
      sortOrder: 1
    },
    {
      titleAr: 'مركز البيانات الرئيسي',
      titleEn: 'Main Data Center',
      descriptionAr: 'تركيب أنظمة تبريد دقيقة لمركز بيانات بسعة 500 خادم.',
      descriptionEn: 'Installation of precision cooling systems for 500-server data center.',
      clientName: 'شركة الاتصالات السعودية',
      location: 'جدة',
      category: 'technology',
      isFeatured: true,
      sortOrder: 2
    },
    {
      titleAr: 'مستشفى الملك فهد التخصصي',
      titleEn: 'King Fahd Specialist Hospital',
      descriptionAr: 'تجهيز غرف العمليات والعناية المركزة بأنظمة تهوية معقمة.',
      descriptionEn: 'Equipping operating rooms and ICU with sterile ventilation systems.',
      clientName: 'وزارة الصحة',
      location: 'الدمام',
      category: 'healthcare',
      isFeatured: true,
      sortOrder: 3
    },
    {
      titleAr: 'مصنع البتروكيماويات',
      titleEn: 'Petrochemical Plant',
      descriptionAr: 'تصميم وتنفيذ أنظمة شفط الأبخرة والغازات الخطرة.',
      descriptionEn: 'Design and implementation of hazardous vapor and gas extraction systems.',
      clientName: 'سابك',
      location: 'الجبيل',
      category: 'industrial',
      isFeatured: false,
      sortOrder: 4
    },
    {
      titleAr: 'مجمع الأفنيوز التجاري',
      titleEn: 'Avenues Mall',
      descriptionAr: 'تركيب أنظمة تكييف مركزي لمجمع تجاري بمساحة 200,000 متر مربع.',
      descriptionEn: 'Installation of central air conditioning systems for 200,000 sqm commercial complex.',
      clientName: 'مجموعة الفطيم',
      location: 'الرياض',
      category: 'commercial',
      isFeatured: false,
      sortOrder: 5
    }
  ];

  for (const project of projects) {
    await connection.execute(
      `INSERT INTO projects (titleAr, titleEn, descriptionAr, descriptionEn, clientName, location, category, isFeatured, sortOrder, isActive) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, true)`,
      [project.titleAr, project.titleEn, project.descriptionAr, project.descriptionEn, project.clientName, project.location, project.category, project.isFeatured, project.sortOrder]
    );
  }
  console.log('✓ Projects seeded');

  await connection.end();
  console.log('Database seeding completed!');
}

seed().catch(console.error);
