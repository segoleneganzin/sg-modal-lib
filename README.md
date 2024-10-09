# SG Modal Library

![Static Badge](https://img.shields.io/badge/Made_with-ReactJS-blue)
![Static Badge](https://img.shields.io/badge/Publish_on-npm-red)

**sg-modal-lib** is a simple and flexible React library for creating and managing modals in your web applications.
It allows you to easily create custom modals with themes and configurations.

## Features

- **Easy to use** : Simple library for creating modals.
- **Customizable** : Apply different themes (light/dark) and custom button text.
- **Lightweight** : Built with minimal dependencies to keep your bundle size small.

## Installation

To install the `sg-modal-lib` library, you can use npm or yarn :

```
npm install sg-modal-lib
```

or

```
yarn add sg-modal-lib
```

## Usage

Here's a basic example of how to use the `Modal` component in your React application :

```javascript
import { useState } from 'react';
import { Modal } from 'sg-modal-lib';
import 'sg-modal-lib/style.css'; // Import default styles function

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button onClick={toggleModal}>Open Modal</button>
      {isModalOpen && (
        <Modal
          isOpen={isOpen}
          toggleModal={toggleModal}
          infos={{ title: 'Example Modal', btnText: 'Close' }}
          styleTheme='light'
        >
          <p>This is the content inside the modal!</p>
        </Modal>
      )}
    </div>
  );
};

export default App;
```

## Props

### Modal

The `Modal` component accepts the following props :
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| **`isOpen`** | boolean | yes | Indicates whether the modal is open or closed |
| **`toggleModal`** | function | yes | Function to toggle the modal's visibility |
| **`infos`** | object | no | Contains information for the modal |
| **`infos.title`** | string | no | The title of the modal, displayed on top if provided. If no provided, it's not displayed. |
| **`infos.btnText`** | string | no | The text for the button to close the modal, if provided. If no provided, it's not displayed |
| **`children`** | React.ReactNode | no | The content to be displayed inside the modal |
| **`styleTheme`** | string | no | Optional theme for the modal (e.g., `'light'`, `'dark'`). If no provided, default theme is applied. |

## Styling

The library includes default styles that can be imported using :

```javascript
import 'sg-modal-lib/style.css';
```

You can also override these styles in your project by applying additional styles.

Css className :

- sg-modal-lib
- sg-modal-lib\_\_bground ➡ set to use the entire window as background
- sg-modal-lib\_\_bground-element ➡ set to use background color behind the modal
- sg-modal-lib\_\_body-content
- sg-modal-lib\_\_body
- sg-modal-lib\_\_body-close
- sg-modal-lib\_\_body-title
- sg-modal-lib\_\_body-children-container
- sg-modal-lib\_\_btn

> Remember to import the CSS file before your own so that you can override it.

Default theme : <br>
![Default theme screenshot](./src/assets/defaultTheme.png) <br>
Light theme : <br>
![Light theme screenshot](./src/assets/lightTheme.png) <br>
Dark theme : <br>
![Dark theme screenshot](./src/assets/darkTheme.png) <br>

## Dependencies

### Production Dependencies

- **[react](https://www.npmjs.com/package/react)**: ^18.3.1
- **[react-dom](https://www.npmjs.com/package/react-dom)**: ^18.3.1
- **[prop-types](https://www.npmjs.com/package/prop-types)**: ^15.8.1

### Development Dependencies

- **[vite](https://www.npmjs.com/package/vite)**: ^5.4.8
- **[sass](https://www.npmjs.com/package/sass)**: ^1.79.4
- **[copyfiles](https://www.npmjs.com/package/copyfiles)**: ^2.4.1
- **[@testing-library/react](https://www.npmjs.com/package/@testing-library/react)**: ^16.0.1
- **[@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react)**: ^4.3.2
- **[@vitest/coverage-v8](https://www.npmjs.com/package/@vitest/coverage-v8)**: ^2.1.2
- **[globals](https://www.npmjs.com/package/globals)**: ^15.11.0
- **[jsdom](https://www.npmjs.com/package/jsdom)**: ^25.0.1
- **[vitest](https://www.npmjs.com/package/vitest)**: ^2.1.2

## Authors

- **Ségolène Ganzin** - Initial work and main development ([GitHub Profile](https://github.com/segoleneganzin/))
