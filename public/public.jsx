{/* Children */}
{hasChildren &&
  openMenu === index && (
    <div
      className={`mt-1 space-y-1 ${
        isOpen
          ? "ml-4"
          : "flex flex-col items-center"
      }`}
    >
      {link.children.map((child) => {
        const ChildIcon = child.icon;

        const childActive =
          pathname === child.path;

        return (
          <Link
            key={child.name}
            href={child.path}
          >
            <div
              className={`flex items-center ${
                isOpen
                  ? "gap-3 px-3"
                  : "justify-center"
              } py-2 rounded-lg text-sm ${
                childActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600"
              }`}
            >
              <ChildIcon
                size={isOpen ? 16 : 22}
              />

              {isOpen && (
                <span>{child.name}</span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  )}