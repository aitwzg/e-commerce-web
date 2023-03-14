import { onUnmounted, ref } from 'vue'
import { useIntervalFn, useIntersectionObserver } from '@vueuse/core'
import dayjs from 'dayjs'

export const useLazyData = (apiFn) => {
    const target = ref(null)
    const result = ref([])
    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
        if (isIntersecting) {
            // 停止观察
            stop()
            apiFn().then(data => {
                result.value = data.result
                // console.log(result.value)
            })
        }
    },
        {
            threshold: 0
        }
    )
    return { target, result }
}

export const usePayTime = (countdown) => {
    const timeText = ref('')
    const time = ref()

    // 倒计时逻辑
    const { pause, resume } = useIntervalFn(
        () => {
            time.value--
            timeText.value = dayjs.unix(time.value).format('mm分ss秒')

            if (time.value <= 0) {
                pause()
            }
        },
        1000,
        false
    )

    const start = (countdown) => {
        time.value = countdown
        timeText.value = dayjs.unix(time.value).format('mm分ss秒')
        resume()
    }
    onUnmounted(() => {
        pause()
    })
    return { start, timeText }
}