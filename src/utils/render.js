export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTER: `after`,
  BEFORE: `before`,
};

export const render = (container, component, position) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
    case RenderPosition.AFTER:
      container.after(component.getElement());
      break;
    case RenderPosition.BEFORE:
      container.before(component.getElement());
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isAllElementsExist = !!(parentElement && newElement && oldElement);

  if (isAllElementsExist && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
