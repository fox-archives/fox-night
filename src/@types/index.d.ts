interface CAttributeStyleMap {
	set(property: string, value: any): undefined
}
interface HTMLElement {
	computedStyleMap: () => {}
	attributeStyleMap: CAttributeStyleMap
}
