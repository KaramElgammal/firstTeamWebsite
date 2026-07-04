<?php

namespace Database\Seeders;

use App\Models\NewsItem;
use App\Models\Project;
use App\Models\Service;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    /**
     * Seed the initial News, Projects and Services content that used to be
     * hard-coded in the frontend, so nothing is lost when switching to a
     * database-driven admin panel.
     */
    public function run(): void
    {
        if (Project::count() === 0) {
            $projects = [
                [
                    'name_en' => 'Medical 3D Printing',
                    'name_ar' => 'الطباعة الثلاثية الأبعاد الطبية',
                    'description_en' => "Work Report – Medical 3D Model Printing\nA client request from a medical college was fulfilled to print a set of anatomical models, including:\n• Brain artery model\n• Urinary system model\n• Additional anatomical model as per study requirements\nPrinted with high-quality materials, with coloring and academic preparation available upon request, using flexible and rigid materials according to each model's nature.\nFirst Team provides design and printing services for medical and educational models across all specializations, with nationwide shipping available.",
                    'description_ar' => "تقرير عمل – طباعة مجسّمات طبية ثلاثية الأبعاد\nتم تنفيذ طلب عميل من كلية الطب لطباعة مجموعة من المجسّمات التشريحية، وتشمل:\n• مجسّم لشرايين المخ\n• مجسّم للجهاز البولي\n• مجسّم تشريحي إضافي حسب متطلبات الدراسة\nتمت الطباعة بخامات عالية الجودة، مع إتاحة التلوين والتجهيز الأكاديمي عند الطلب، باستخدام خامات مرنة وصلبة وفق طبيعة كل مجسّم.\nيوفّر First Team خدمة تصميم وطباعة المجسّمات الطبية والتعليمية لجميع التخصصات، مع إمكانية الشحن داخل جميع المحافظات.",
                    'images' => ['/project_img/1/medical1.jpg', '/project_img/1/medical2.jpg', '/project_img/1/medical3.jpg', '/project_img/1/medical4.jpg'],
                    'sort_order' => 1,
                ],
                [
                    'name_en' => 'Interactive Fracture Education Model',
                    'name_ar' => 'مجسم تعليمي تفاعلي لأنواع الكسور',
                    'description_en' => "Work Report | First Team\nAn interactive educational model was developed for students, visually demonstrating types of bone fractures in a simplified way that supports quick understanding and practical application.\nThe model consists of 4 columns, each with 3 segments, providing a structured explanation that serves the educational process and academic projects.\nManufactured to a high standard suitable for use in schools and universities.",
                    'description_ar' => "تقرير عمل | First Team\nتنفيذ مجسم تعليمي تفاعلي لطلاب، يوضح أنواع الكسور بأسلوب بصري مبسط يساعد على الفهم السريع والتطبيق العملي.\nيتكون المجسم من 4 أعمدة، بكل عمود 3 فقرات، ليقدم شرحًا منظمًا يخدم العملية التعليمية والمشروعات الأكاديمية.\nتم تنفيذ المجسم بجودة عالية ليتناسب مع الاستخدام داخل المدارس والجامعات.",
                    'images' => ['/project_img/2/medical3.jpg', '/project_img/2/medical4.jpg', '/project_img/2/medical5.jpg', '/project_img/2/medical6.jpg'],
                    'sort_order' => 2,
                ],
                [
                    'name_en' => 'Drone Design & Manufacturing',
                    'name_ar' => 'تصميم وتصنيع الطائرات بدون طيار',
                    'description_en' => "Project Report | First Team – Drones\nFirst Team designs and builds custom drones tailored to client needs, from lightweight racing frames to multi-rotor platforms built for aerial photography and field operations.\nEach drone is engineered with precision — selecting the right motors, ESCs, flight controllers, and frame geometry to maximize stability, flight time, and performance.\nWhether for competitions, academic projects, surveillance, or photography, we deliver a complete drone solution from design to final test flight.\nFirst Team also provides training and technical support to help clients get the most out of their systems.",
                    'description_ar' => "تقرير مشروع | First Team – الدرونز\nيقوم First Team بتصميم وتصنيع طائرات بدون طيار مخصصة وفق احتياجات العميل، من إطارات السباق الخفيفة إلى منصات متعددة الدوارات مخصصة للتصوير الجوي والعمليات الميدانية.\nيتم تصميم كل طائرة بدقة عالية — باختيار المحركات المناسبة ووحدات التحكم في السرعة وأجهزة التحكم في الطيران وهندسة الإطار لتحقيق أقصى استقرار ووقت طيران وأداء.\nسواء كانت للمسابقات أو المشاريع الأكاديمية أو المراقبة أو التصوير، نقدم حلًا متكاملاً للطائرات من التصميم حتى رحلة الاختبار النهائية.\nيوفر First Team أيضاً التدريب والدعم الفني لمساعدة العملاء على الاستفادة القصوى من أنظمتهم.",
                    'images' => ['/project_img/4/drone1.jpg'],
                    'sort_order' => 3,
                ],
                [
                    'name_en' => 'Spider Robot',
                    'name_ar' => 'روبوت العنكبوت',
                    'description_en' => "Project Report | First Team – Spider Robot\nA multi-legged spider robot designed and built entirely by the First Team, capable of moving across uneven terrain with smooth, coordinated leg motion.\nThe robot uses servo motors for each leg joint, controlled by a central microcontroller that manages gait patterns and real-time movement adjustments.\nIdeal for robotics competitions, STEM exhibitions, and research projects in locomotion and biomechanics.\nFirst Team handles the full build: mechanical design, electronics wiring, and programming.",
                    'description_ar' => "تقرير مشروع | First Team – روبوت العنكبوت\nروبوت متعدد الأرجل تم تصميمه وبناؤه بالكامل من قِبل First Team، قادر على التنقل فوق الأسطح الوعرة بحركة أرجل منسقة وسلسة.\nيستخدم الروبوت محركات سيرفو في كل مفصل من مفاصل الأرجل، تتحكم بها وحدة تحكم مركزية تدير أنماط المشي وتعديلات الحركة في الوقت الفعلي.\nمثالي لمسابقات الروبوتيكس ومعارض STEM ومشاريع الأبحاث في مجال الحركة والميكانيكا الحيوية.\nيتولى First Team البناء الكامل: التصميم الميكانيكي، وتوصيل الإلكترونيات، والبرمجة.",
                    'images' => ['/project_img/3/spiderR.jpg'],
                    'sort_order' => 4,
                ],
                [
                    'name_en' => 'Robotic Arm',
                    'name_ar' => 'الإيد الروبوتية',
                    'description_en' => "Project Report | First Team – Robotic Arm\nA fully articulated robotic arm engineered to replicate human arm movements with precision, built for educational, industrial, and competition purposes.\nEquipped with multiple degrees of freedom, the arm can pick, place, rotate, and grip objects with high accuracy using servo-driven joints and a programmable control system.\nApplications include automated assembly tasks, laboratory use, robotics competitions, and academic demonstrations.\nDesigned and programmed end-to-end by the First Team engineering team.",
                    'description_ar' => "تقرير مشروع | First Team – الإيد الروبوتية\nذراع روبوتية متكاملة مصممة لمحاكاة حركات الذراع البشرية بدقة عالية، مُنشأة لأغراض تعليمية وصناعية وتنافسية.\nمزودة بدرجات حرية متعددة، يمكنها الإمساك بالأشياء ونقلها وتدويرها بدقة عالية باستخدام مفاصل تعمل بالسيرفو ونظام تحكم قابل للبرمجة.\nالتطبيقات تشمل مهام التجميع الآلي، والاستخدام المختبري، ومسابقات الروبوتيكس، والعروض الأكاديمية.\nتم تصميمها وبرمجتها بالكامل من قِبل فريق First Team الهندسي.",
                    'images' => ['/project_img/3/armR.jpg'],
                    'sort_order' => 5,
                ],
                [
                    'name_en' => 'Sign Language & Prosthetic Robotic Hand',
                    'name_ar' => 'يد روبوتية للغة الإشارة والأطراف الصناعية',
                    'description_en' => "Project Report | First Team – Robotic Hand\nAn advanced robotic hand designed to serve two powerful purposes: enabling sign language communication and functioning as a prosthetic limb for amputees.\nEach finger is independently controlled using servo motors and flex sensors, allowing precise replication of hand gestures used in sign language.\nThe prosthetic mode allows natural-feeling grip and motion, helping users regain daily functionality with a lightweight, durable design.\nBuilt with accessibility and inclusivity in mind — bridging the gap between technology and human need.\nDeveloped end-to-end by First Team: mechanical design, sensor integration, and embedded programming.",
                    'description_ar' => "تقرير مشروع | First Team – اليد الروبوتية\nيد روبوتية متطورة صُممت لخدمة غرضين أساسيين: تمكين التواصل بلغة الإشارة، والعمل كطرف اصطناعي للأشخاص الذين فقدوا أيديهم.\nكل إصبع يُتحكم فيه بشكل مستقل باستخدام محركات سيرفو وحساسات مرونة، مما يتيح محاكاة دقيقة لإيماءات اليد المستخدمة في لغة الإشارة.\nفي وضع الطرف الاصطناعي، توفر اليد إحساساً طبيعياً بالإمساك والحركة، مما يساعد المستخدمين على استعادة وظائفهم اليومية بتصميم خفيف الوزن ومتين.\nصُممت بوعي كامل بمبدأ إتاحة التقنية للجميع — لتجسر الهوة بين التكنولوجيا والاحتياج الإنساني.\nطوّرها فريق First Team بالكامل: التصميم الميكانيكي، ودمج الحساسات، والبرمجة المدمجة.",
                    'images' => ['/project_img/8/rb.jpg'],
                    'sort_order' => 6,
                ],
            ];

            foreach ($projects as $project) {
                Project::create($project);
            }
        }

        if (NewsItem::count() === 0) {
            $newsItems = [
                [
                    'tag_en' => 'Event',
                    'tag_ar' => 'فعالية',
                    'date' => 'October 12, 2025',
                    'title_en' => 'First Team at "Still Human" Event — Bibliotheca Alexandrina',
                    'title_ar' => 'First Team في فعالية "لسه إنسان" — مكتبة الإسكندرية',
                    'body_en' => "We were honored to attend the \"Still Human\" event on Sunday, October 12, 2025, at the Bibliotheca Alexandrina.\nIt was a privilege to be in the presence of distinguished figures, including:\n• Major General Yasser El-Khatib — Commander of the Northern Military Region\n• His Grace Bishop Bafli — Bishop of Alexandria\n• Dr. Mohamed El-Gohari — President of Borg Al-Arab Technological University\n• Dr. Alaa Arafa — Dean of the Faculty of Industry and Energy\n• Dr. Ahmed Zayed — President of the Bibliotheca Alexandrina\n• And several prominent political figures.\nWe sincerely hope we presented work worthy of such distinguished guests, and we look forward to further collaboration and success.",
                    'body_ar' => "تشرفنا بحضور فعالية \"لسه إنسان\" يوم الأحد الموافق 12 أكتوبر 2025 في مكتبة الإسكندرية.\nكان شرفاً لنا وجود كل من:\n• اللواء أركان حرب ياسر الخطيب — قائد المنطقة الشمالية العسكرية\n• نيافة الأنبا بافلي — أسقف الإسكندرية\n• الدكتور محمد الجوهري — رئيس جامعة برج العرب التكنولوجية\n• الدكتور علاء عرفة — عميد كلية الصناعة والطاقة\n• الدكتور أحمد زايد — رئيس مكتبة الإسكندرية\n• وشخصيات سياسية متميزة.\nنتمنى أن نكون قد قدمنا ما يليق بمكانة هذه الشخصيات المرموقة، ونتطلع لمزيد من التعاون والنجاح.",
                    'images' => ['/project_img/7/ftp8.jpg'],
                    'sort_order' => 1,
                ],
                [
                    'tag_en' => 'Exhibition',
                    'tag_ar' => 'معرض',
                    'date' => 'Egypt Energy 2025',
                    'title_en' => 'First Team at Egypt Energy 2025 — A Journey Between the Future and Clean Energy',
                    'title_ar' => 'First Team في معرض Egypt Energy 2025 — رحلة بين المستقبل والطاقة النظيفة',
                    'body_en' => "In line with First Team's commitment to keeping pace with industrial and technological development, the team participated in the Egypt Energy 2025 exhibition — one of the largest regional exhibitions specializing in new and renewable energy and energy efficiency.\nThe visit aimed to explore the latest global innovations and technologies in the energy sector, engage directly with companies and innovators, and enrich the practical knowledge of team members.\nThis participation reflects the team's belief in the role of youth in leading the transition to clean energy and supporting Egypt's Vision 2030 in sustainable development and modern technology.\nFirst Team — The Technology Generation… Building the Future.",
                    'body_ar' => "في إطار حرص First Team على مواكبة التطور الصناعي والتكنولوجي، شارك الفريق في فعاليات معرض Egypt Energy 2025، أحد أكبر المعارض الإقليمية المتخصصة في مجالات الطاقة الجديدة والمتجددة وكفاءة الطاقة.\nجاءت الزيارة بهدف الاطلاع على أحدث الابتكارات والتقنيات العالمية في مجال الطاقة، والتفاعل المباشر مع الشركات والمبدعين في هذا القطاع الحيوي.\nتُجسد هذه المشاركة إيمان الفريق بدور الشباب في قيادة التحول نحو الطاقة النظيفة ودعم رؤية مصر 2030 في مجال التنمية المستدامة والتكنولوجيا الحديثة.\nFirst Team — جيل التكنولوجيا… يصنع المستقبل.",
                    'images' => [
                        '/project_img/5/ftp1.jpg',
                        '/project_img/5/ftp2.jpg',
                        '/project_img/5/ftp3.jpg',
                        '/project_img/5/ftp4.jpg',
                        '/project_img/5/ftp5.jpg',
                        '/project_img/5/ftp6.jpg',
                    ],
                    'sort_order' => 2,
                ],
                [
                    'tag_en' => 'Exhibition',
                    'tag_ar' => 'معرض',
                    'date' => 'MACTECH 2025',
                    'title_en' => 'First Team at MACTECH Exhibition — International Fairs Ground',
                    'title_ar' => 'First Team في معرض MACTECH — أرض المعارض الدولية',
                    'body_en' => "We were honored to receive a generous invitation from Patron Company to attend the MACTECH exhibition at the International Fairs Ground, organized by International Fairs Group.\nThe exhibition covered several specialized industrial fields, most notably 3D printers, robots, CNC machines, and various industry-supporting sectors.\nThe team had the pleasure of attending the event at the International Fairs Ground in the Fifth Settlement, getting acquainted with numerous companies from inside and outside Egypt, and opening horizons for joint cooperation through knowledge exchange, training, and acquiring products that support the team's current and future projects.\nAll thanks and appreciation to PATRON and the event organizers.",
                    'body_ar' => "تشرفنا بتلقّي دعوة كريمة من شركة Patron لحضور معرض MACTECH بأرض المعارض الدولية، بتنظيم شركة International Fairs Group.\nيضم المعرض عدة مجالات صناعية متخصصة، من أبرزها الطابعات ثلاثية الأبعاد، الروبوتات، وماكينات CNC، إلى جانب مجالات متنوعة داعمة للصناعة.\nسعد الفريق بحضور الحدث والتعرّف على العديد من الشركات من داخل مصر وخارجها، وفتح آفاق للتعاون المشترك من خلال تبادل الخبرات والتدريب.\nكل الشكر والتقدير لشركة PATRON وللقائمين على تنظيم الحدث.",
                    'images' => [
                        '/project_img/6/ftp6.jpg',
                        '/project_img/6/ftp7.jpg',
                        '/project_img/6/ftp8.jpg',
                    ],
                    'sort_order' => 3,
                ],
            ];

            foreach ($newsItems as $newsItem) {
                NewsItem::create($newsItem);
            }
        }

        if (Service::count() === 0) {
            $services = [
                [
                    'icon' => 'CodeXml',
                    'title_en' => 'Software Development',
                    'title_ar' => 'تطوير البرمجيات',
                    'description_en' => 'Hard-coded excellence using modern tech stacks. Scalable architectures built for mission-critical reliability.',
                    'description_ar' => 'دقة تكتيكية باستخدام أحدث التقنيات البرمجية. بنية قابلة للتوسع مصممة للاعتمادية العالية.',
                    'image' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop',
                    'request_route' => 'service-request',
                    'sort_order' => 1,
                ],
                [
                    'icon' => 'MonitorIcon',
                    'title_en' => 'Web Development',
                    'title_ar' => 'تطوير الويب',
                    'description_en' => 'High-performance websites and web applications tailored for speed, security, and exceptional user experience.',
                    'description_ar' => 'مواقع وتطبيقات ويب عالية الأداء مصممة للسرعة والأمان وتجربة استخدام استثنائية.',
                    'request_route' => 'service-request',
                    'sort_order' => 2,
                ],
                [
                    'icon' => 'Cpu',
                    'title_en' => 'Hardware Engineering',
                    'title_ar' => 'هندسة الهاردوير',
                    'description_en' => 'Custom circuitry and robust electronic design for high-stress operational environments.',
                    'description_ar' => 'تصميم دوائر ومكونات إلكترونية متينة تتحمل بيئات التشغيل شديدة الضغط.',
                    'request_route' => 'service-request',
                    'sort_order' => 3,
                ],
                [
                    'icon' => 'Box',
                    'title_en' => '3D Design & Printing',
                    'title_ar' => 'التصميم والطباعة ثلاثية الأبعاد',
                    'description_en' => 'Rapid prototyping and precision manufacturing using advanced additive technologies and modeling.',
                    'description_ar' => 'نمذجة أولية سريعة وتصنيع دقيق باستخدام أحدث تقنيات الطباعة والتصميم ثلاثي الأبعاد.',
                    'request_route' => '3d-request',
                    'sort_order' => 4,
                ],
                [
                    'icon' => 'Bot',
                    'title_en' => 'Robotics',
                    'title_ar' => 'الروبوتات',
                    'description_en' => 'Automated strike systems and autonomous agents engineered for precision movement and execution.',
                    'description_ar' => 'أنظمة آلية وروبوتات ذاتية التحكم مصممة للحركة والتنفيذ بدقة عالية.',
                    'request_route' => 'robotics-request',
                    'sort_order' => 5,
                ],
                [
                    'icon' => 'PaletteIcon',
                    'title_en' => 'Graphic Design & Multimedia',
                    'title_ar' => 'الجرافيك والميديا',
                    'description_en' => 'Professional branding, photo editing, video montage, and documentation to visually dominate your market.',
                    'description_ar' => 'هوية بصرية احترافية، تعديل صور، مونتاج فيديو، وتوثيق مرئي يضمن تميزك في السوق.',
                    'request_route' => 'service-request',
                    'sort_order' => 6,
                ],
            ];

            foreach ($services as $service) {
                Service::create($service);
            }
        }
    }
}
