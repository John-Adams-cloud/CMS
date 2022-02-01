import { App } from 'vue'
import { ElButton, ElInput } from 'element-plus'

const components = [ElButton, ElInput]

export function registerElement(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
