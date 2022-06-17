import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export const useLazyData = (apiFn) => {
    const target = ref(null)
    const result = ref([])
    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
        if (isIntersecting) {
            // 停止观察
            stop()
            apiFn().then(data => {
                result.value = data.result
                console.log(result.value)
            })
        }
    },
        {
            threshold: 0
        }
    )
    return { target, result }
}