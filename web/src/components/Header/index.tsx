import { Disclosure } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/20/solid";
import { Cookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navigation = [
  { name: 'Lista de usuários', href: '/' },
  { name: 'HTTP Cat', href: '/http-cat' },
  { name: 'Random Dog', href: '/random-dog' },
  { name: 'Clientes', href: '/clients' },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

function Header() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSignOut() {
    cookies.remove("token", { path: "/" });
    navigate(0);
  }

  return (
    <Disclosure as="nav">
    {({ open }) => (
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-end justify-end">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-[#1ba2a1] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end sm:mr-6">
              <div className="hidden sm:ml-6 sm:block h-full">
                <div className="flex space-x-4 h-full">
                  {navigation.map((item) => (
                    <Link
                      to={item.href}
                      key={item.name}
                      className={classNames(
                        item.href === location.pathname ? ' text-[#1ba2a1] font-semibold' : 'text-gray-600 font-semibold hover:text-[#1ba2a1]',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                      aria-current={item.href === location.pathname ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute inset-y-0 right-0 flex items-center mb-1 justify-center pr-2 sm:border-l sm:pl-5 sm:border-gray-300 sm:static sm:inset-auto sm:pr-0">
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-full text-sm font-semibold p-1 text-gray-600 hover:text-[#1ba2a1] focus:outline-none"
              >
                Sair
              </button>
            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.href === location.pathname ? 'text-[#1ba2a1] font-semibold' : 'text-gray-500 hover:bg-[#1ba2a1] hover:text-white',
                  'block px-3 py-2 rounded-md text-base font-medium'
                )}
                aria-current={item.href === location.pathname ? 'page' : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
  );
}

export default Header;