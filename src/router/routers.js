import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/product',
    name: 'product',
    meta: {
      icon: 'logo-buffer',
      title: '产品管理'
    },
    component: Main,
    children: [
      {
        path: 'product_category',
        name: 'product_category',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '产品类别'
        },
        component: () => import('@/view/production/product-category/product-category.vue')
      },
      {
        path: 'product_brand',
        name: 'product_brand',
        meta: {
          icon: 'md-trending-up',
          title: '产品品牌'
        },
        component: () => import('@/view/production/product-brand/product-brand.vue')
      },
      {
        path: 'product_info',
        name: 'product_info',
        meta: {
          icon: 'ios-infinite',
          title: '产品信息'
        },
        component: () => import('@/view/production/product-info/product-info.vue')
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      icon: 'ios-hammer',
      title: '订单管理'
    },
    component: Main,
    children: [
      {
        path: 'order_info',
        name: 'order_info',
        meta: {
          icon: 'ios-pricetag',
          title: '订单信息'
        },
        component: () => import('@/view/order/order-info.vue')
      },
      {
        path: 'logistics_info',
        name: 'logistics_info',
        meta: {
          icon: 'ios-plane',
          title: '物流信息'
        },
        component: () => import('@/view/order/logistics-info.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      icon: 'md-person-add',
      title: '用户管理'
    },
    component: Main,
    children: [
      {
        path: 'user_info',
        name: 'user_info',
        meta: {
          icon: 'md-person',
          title: '用户信息'
        },
        component: () => import('@/view/user/user-info.vue')
      },
      {
        path: 'user_addr_info',
        name: 'user_addr_info',
        meta: {
          icon: 'ios-pin',
          title: '用户地址信息'
        },
        component: () => import('@/view/user/user-addr-info.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'short_info',
        name: 'short_info',
        meta: {
          icon: 'md-chatboxes',
          title: '短信信息'
        },
        component: () => import('@/view/message/short-info.vue')
      }
    ]
  },
  {
    path: '/config',
    name: 'config',
    meta: {
      icon: 'ios-build',
      title: '配置信息'
    },
    component: Main,
    children: [
      {
        path: 'company_info',
        name: 'company_info',
        meta: {
          icon: 'ios-copy',
          title: '公司信息'
        },
        component: () => import('@/view/configuration/company-info.vue')
      },
      {
        path: 'company_addr_info',
        name: 'company_addr_info',
        meta: {
          icon: 'ios-pin-outline',
          title: '公司地址信息'
        },
        component: () => import('@/view/configuration/company-addr-info.vue')
      },
      {
        path: 'scroll_pic',
        name: 'scroll_pic',
        meta: {
          icon: 'ios-image',
          title: '滚动图片'
        },
        component: () => import('@/view/configuration/scroll-pic.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
