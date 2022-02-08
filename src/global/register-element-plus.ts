import { App } from 'vue'

import {
  ElButton,
  ElInput,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElForm,
  ElFormItem
} from 'element-plus'

const components = [
  ElButton,
  ElInput,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElForm,
  ElFormItem
]

export function registerElement(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
