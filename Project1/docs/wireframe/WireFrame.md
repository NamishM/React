# SRS Anywhere Wireframe

## Overview
 The SRS Wireframe is the shell of the application. It provides regions within the application in which to 'plug-in' content and features through modules.
 The wireframe follows a responsive layout design to effectively adjust layout across a variety of resolutions.
 Within the Wireframe, the state of the UI is accessible to all modules and can be manipulated through an API.


## Regions
The Wireframe provides the following regions:

 * **Header**:
 Provides the top area in which to plug in menus, navigation, and branding.

 * **Left Panel**:
 Similar to the left panel in the thick client.  Will provide a narrower vertical
 panel in which to provide features such as the Appointment Selector, Patient Search, Mail Message List

 * **Right Panel**:
 This is the main area for application content.  For example, IDash, Mail Message Details,
 Documents, etc..

 * **Drawers**:
 This component is dedicated to the use of Drawers as displayed in the Anywhere prototype.

## Responsive Behavior
 The Bootstrap library is used to provide responsive classes and styling features that
 can be leveraged across multiple resolutions.  As such, the wireframe will have the ability to
 adjust content and layout across the standard bootstrap resolution thresholds.

The Wireframe regions are configured to behave as follows for the following media sizes:
* **small** *( <768px )*:
  * The Left Panel only is displayed by default.
  * The ability to toggle between right and left panels is provided using redux actions.

* **extra small** *( 769px - 991px )*:
  * The Left Panel only is displayed by default.
  * The ability to toggle between right and left panels is provided using redux actions.

* **medium** *( 992px - 1199px )*:
  * Both left and right panels are visible.
  * The ability to collapse and expand the left panel is provide using redux actions.

* **large** *( >1200px )*:
  * Both left and right panels are visible.
  * Bottom drawers are visible.
  * The ability to collapse and expand the left panel is provide using redux actions.

---

## Wireframe API
The Wireframe is implemented as a module within the SRS Anywhere project.

The role of the Wireframe module is as follows:
* Provide *Regions* as indicated above where content can be 'plugged' in.
**(see router documentation)**
* Adjust layout based on resolution sizes as indicated in the *Responsive Behavior* section above.
* Provide UI state information in the data-store. This information is accessible to all native modules loaded within the application.
* Provide *actions* that can be used to drive UI state changes.

## UI State
The state of the UI is accessible across all modules through the data store.
The store provides this information within the following 2 objects / keys:

* Browser
* Wireframe


    browser
    {
      width: (int) viewport width
      height: (int) viewport height
      mediaType: [extraSmall | small | medium | large | extraLarge]
      orientation: [portrait | landscape]
      screenLayout: [device | desktop]

      lessThan: {
        extraSmall: bool
        small: bool
        medium: bool
        large: bool
        extraLarge: bool
      }

      greaterThan: {
        extraSmall: bool
        small: bool
        medium: bool
        large: bool
        extraLarge: bool
      }
    }

    wireframe
    {
      desktopVisiblePanel: [both | right]
      deviceVisiblePanel: [left | right]
    }

## Actions

The Wireframe module provides the ability to control what UI regions are available by providing the following *actions*.

 * **desktopToggleFullscreen()**

  When the Wireframe is displayed in medium / larger / extraLarge resolutions, both the left and right panels are viewable.
  Calling this action will collapse the Left Panel.

 * **smallTogglePanels()**

  When the Wireframe is displayed in small and extraSmall resolutions, either the left or right panels
  are visible but not both.  Calling this action will toggle which panel is visible.
