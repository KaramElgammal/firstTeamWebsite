<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @if (app()->getLocale() === 'ar')
            <meta name="description" content="First Team - فريق هندسي متكامل يقدم حلولاً عالية الأداء في تطوير البرمجيات والويب، هندسة الهاردوير، التصميم والطباعة ثلاثية الأبعاد، الروبوتات، والجرافيك والميديا. دقة تكتيكية وجودة احترافية في كل مشروع.">
            <meta name="keywords" content="First Team, فيرست تيم, تطوير البرمجيات, تطوير الويب, هندسة الهاردوير, تصميم ثلاثي الأبعاد, طباعة ثلاثية الأبعاد, روبوتات, أتمتة, جرافيك وميديا, تصميم هويات بصرية, مونتاج فيديو, حلول تقنية, برمجة مواقع, تطبيقات ويب, PCB, إنترنت الأشياء, IoT">
        @else
            <meta name="description" content="First Team is a full-stack engineering team delivering high-performance solutions in software development, web development, hardware engineering, 3D design & printing, robotics, and graphic design & multimedia. Tactical precision and professional quality in every project.">
            <meta name="keywords" content="First Team, software development, web development, hardware engineering, 3D design, 3D printing, robotics, automation, graphic design, multimedia, branding, video editing, tech solutions, web applications, PCB design, IoT, Internet of Things">
        @endif

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <link rel="icon" type="image/png" href="/logo.png" />
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
